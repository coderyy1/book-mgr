<template>
  <div class="layout-basic">
    <div class="header">
      <div class="h-left">
        <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
        <div class="l-info">图书管理系统</div>
      </div>
      <div class="h-right">
        <div class="hello-msg">
          {{ `${store.state.userInfo.account},欢迎！` }}
        </div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>
    <div class="header-placeholder"></div>

    <div class="content">
      <div class="left">
        <app-nav/>
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>