<template>
    <div class="container">
        <div class="row justify-content-center">
            <h1 class="h3 mb-3 font-weight-normal">
                請先登入
            </h1>
            <div class="col-8">
                <form id="form" class="form-signin">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="username" placeholder="name@example.com"
                            required autofocus v-model="user.username">
                        <label for="username">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="password" placeholder="Password" required
                            v-model="user.password">
                        <label for="password">Password</label>
                    </div>
                    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" id="login"
                        @click.prevent="login">
                        登入
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // #2 發送 API 至遠端並登入（並儲存 Token）
      const url = `${process.env.VUE_APP_API}/admin/signin`
      this.$http.post(url, this.user)
      // 成功的結果
        .then(res => {
          // console.log(res);
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          // 登入後跳轉頁面
          this.$router.push('/admin/products')
        })
      // 失敗的結果
        .catch(err => {
          alert(err.data.message)
        })
    }
  }
}
</script>
