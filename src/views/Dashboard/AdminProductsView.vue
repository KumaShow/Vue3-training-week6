<template>
<h1>後台產品列表</h1>
<table class="table mt-4">
                <thead>
                    <tr>
                        <th width="120">
                            分類
                        </th>
                        <th>產品名稱</th>
                        <th width="120">
                            原價
                        </th>
                        <th width="120">
                            售價
                        </th>
                        <th width="100">
                            是否啟用
                        </th>
                        <th width="120">
                            編輯
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products" :key="item.id">
                        <td>{{ item.category }}</td>
                        <td>{{ item.title }}</td>
                        <td class="text-end">{{ item.origin_price }}</td>
                        <td class="text-end">{{ item.price }}</td>
                        <td>
                            <span
                                :class="{'text-success' : item.is_enabled  ,'text-danger' : !item.is_enabled }">{{item.is_enabled
                                ? '啟用' : '未啟用'}}</span>
                        </td>
                        <td>
                            <div class="btn-group">
                                <!-- 編輯按鈕對應品項帶入 -->
                                <button type="button" class="btn btn-outline-primary btn-sm"
                                    @click="openModal('edit', item)">
                                    編輯
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="openModal('delete', item)">
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分頁 -->
            <!-- 內 pages,外 pagination -->
            <!-- 內 get-product, 外 getProduct -->
            <pagination :pages="pagination" @get-product="getProducts"></pagination>
</template>

<script>
import pagination from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      pagination: {}
    }
  },
  components: {
    pagination
  },
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
