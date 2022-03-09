<template>
  <h1>你現在在後台頁面</h1>
    <nav>
      <router-link to="/">回首頁</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">訂單管理</router-link> |
      <a href="#" @click.prevent="logout">登出</a>
    </nav>
  <router-view></router-view>
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    logout () {
      document.cookie = 'hexToken=;expires=;'
      alert('您已登出')
      this.$router.push('/')
    },
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`

        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch(err => {
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
