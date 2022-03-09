<template>
  <h1>你現在在後台頁面</h1>
    <nav>
      <router-link to="/">回首頁</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">訂單管理</router-link> |
      <router-link to="/">登出</router-link>
    </nav>
  <router-view></router-view>
</template>
