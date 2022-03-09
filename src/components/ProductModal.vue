<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                    <span>{{ product.title }}</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <img class="img-fluid" :src="product.imageUrl" alt="">
                    </div>
                    <div class="col-sm-6">
                        <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                        <h1>抓不到資料待處理</h1>
                        <p>商品描述：{{ product.description }}</p>
                        <p>商品內容：{{ product.content }}</p>
                        <div class="h5">{{ product.origin_price }} 元</div>
                        <del class="h6">原價 {{ product.origin_price }} 元</del>
                        <div class="h5">現在只要 {{ product.price }} 元</div>
                        <div>
                            <div class="input-group">
                                <!-- <input type="number" class="form-control" v-model.number="qty" min="1"> -->
                                <select id="" class="form-select" v-model.number="qty">
                                    <option :value="num" v-for="num in 20" :key="`${num}+${product.id}`">
                                        {{ num }}
                                    </option>
                                </select>
                                <button type="button" class="btn btn-primary" @click="addToCart">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['id'],
  data () {
    return {
      product: {},
      modal: {},
      qty: 1
    }
  },
  methods: {
    openModal () {
      this.qty = 1
      this.modal.show()
      console.log(this.product)
    },
    hideModal () {
      this.modal.hide()
    },
    getProduct () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(url).then(res => {
        this.product = res.data.product
      })
    }
    // addToCart () {
    //   // 執行外層方法
    //   this.$emit('add-cart', this.id, this.qty)
    //   this.hideModal()
    // }
  },
  mounted () {
    // ref="modal"
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
