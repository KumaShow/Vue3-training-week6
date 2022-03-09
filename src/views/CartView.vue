<template>
  <div class="cart">
    <h1>This is 購物車頁面</h1>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <table class=" table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <!-- 先確認購物車是否存在 -->
          <template v-if="cartData.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="deleteCartItem(item.id)" :disable="isLoadingItem === item.id">
                    <!-- <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === item.id"></i> -->
                    <span class="spinner-border spinner-border-sm"
                        v-show="isLoadingItem === item.id"></span>
                    x
                </button>
              </td>
              <td>
                  {{ item.product.title }}
                  <!-- <div class="text-success">
                      已套用優惠券
                  </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                  <!-- <input min="1" type="number" class="form-control" v-model.number="item.qty"> -->
                    <select id="" class="form-select" v-model="item.qty"
                      :disable="isLoadingItem === item.id" @change="updateCart(item)">
                      <option :value="num" v-for="num in 20" :key="`${num}+${item.id}`">
                          {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit
                        }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                  {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cartData.total }}</td>
            </tr>
            <tr v-if="cartData.total != cartData.final_total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cartData.final_total }}</td>
            </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <!-- 表單 -->
  <div class="my-5 row justify-content-center">
    <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">* Email</label>
        <VField id="email" name="email" type="email" class="form-control"
            :class="{ 'is-invalid': errors['email'] }" v-model="form.user.email" rules="email|required"
            placeholder="請輸入 Email">
        </VField>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">* 收件人姓名</label>
        <VField id="name" name="姓名" type="text" class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }" v-model="form.user.name" rules="required"
            placeholder="請輸入姓名"></VField>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">* 收件人手機號</label>
        <VField id="tel" name="電話" type="text" class="form-control"
            :class="{ 'is-invalid': errors['電話'] }" v-model="form.user.tel" :rules="isPhone" placeholder="請輸入 09 開頭手機號"></VField>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">* 收件人地址</label>
        <VField id="address" name="地址" type="text" class="form-control"
            :class="{ 'is-invalid': errors['地址'] }" v-model="form.user.address" placeholder="請輸入地址"
            rules="required"></VField>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="form.message" class="form-control" cols="30" rows="10"></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger"
          :disabled="cartData.carts.length === 0">送出訂單</button>
      </div>
    </VForm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartData: {
        // 如未先定義 carts，在讀取 cartData 之後讀不到carts資料，取 length會出錯
        carts: []
      },
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    // 取得購物車資料
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then(res => {
        this.cartData = res.data.data
      })
    },
    // 刪除單一品項
    deleteCartItem (id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoadingItem = id
      this.$http.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    // 更新購物車
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id

      this.$http.put(url, { data }).then(res => {
        alert(res.data.message)
        this.getCart()
        this.isLoadingItem = ''
      }).catch(err => {
        alert(err.data.message)
      })
    },
    // 驗證手機格式
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '手機號碼格式不正確，請輸入 09 開頭手機號'
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      const order = this.form // api 文件為物件 data:{}
      this.$http.post(url, { data: order }).then(res => {
        alert(res.data.message)
        this.$refs.form.resetForm() // 送出表單後清空
        this.getCart()
      }).catch(err => {
        alert(err.data.message)
      })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
