<template>
  <div class="products">
    <h1>This is 產品列表頁面</h1>
    <div class="mt-4">
      <!-- 產品Modal -->
      <!-- <product-modal
        :id="productId"
        ref="productModal"
        @add-cart="addToCart"
      ></product-modal> -->

      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <!-- 多個 style 用物件組合 -->
              <div
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>
              <div class="h6">{{ item.title }}</div>
            </td>
            <td>
              <div class="h5" v-if="item.price === item.origin_price">
                {{ item.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ item.origin_price }} 元</del>
                <div class="h5">現在只要 {{ item.price }} 元</div>
              </div>
            </td>
            <td>
              <!-- :disabled 在點擊按鈕後關閉，避免其他操作 -->
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openProductModal(item.id)"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(item.id)"
                  :disabled="isLoadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoadingItem === item.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <product-modal :id="productId" ref="productModal" @add-cart="addToCart"></product-modal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'

export default {
  components: { ProductModal },
  data () {
    return {
      products: [],
      product: {},
      productId: '',
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () { // 參數預設值，page沒有值則帶入1
      // query 資料帶法為 /?page=${page}
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          // this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    openProductModal (id) {
      // this.productId = id
      this.$refs.productModal.getProduct(id)
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id

      this.$http.post(url, { data }).then(res => {
        alert(res.data.message)
        // this.getCart()
        this.isLoadingItem = ''
      }).catch(err => {
        alert(err.data.message)
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
