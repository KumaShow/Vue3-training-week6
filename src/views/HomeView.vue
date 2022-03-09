<template>
  <div class="home">
    <h1>你現在在前台頁面</h1>
    <nav>
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">前台產品列表</router-link> |
      <router-link to="/cart">前台購物車</router-link> |
      <router-link to="/admin/products">後台</router-link>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {}
}
</script>
