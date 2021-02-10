<template>
  <div class="auth">
    <!-- 背景图 -->
    <div class="bg"></div>
    <!-- 标题 -->
    <div class="title-info">
      <img src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1" alt="">
      <div class="title">图书管理系统 后台</div>
    </div>

    <!-- 表单 -->
    <div class="form">
      <a-tabs >
        <!-- 登陆部分 -->
        <a-tab-pane key="1" tab="登陆">
          <div class="item">
            <a-input placeholder="用户名" size="large" v-model:value="logForm.account" allow-clear>
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="密码" v-model:value="logForm.password" @keyup.enter.native="login" />
          </div>

          <div class="item">
            <a href="javascript:;" 
              @click="resetPwd"
            >忘记密码</a>
          </div>

          <div class="item">
            <a-button type="primary" @click="login">登陆</a-button>
          </div>
        </a-tab-pane>

        <!-- 注册部分 -->
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input placeholder="用户名" size="large" allow-clear v-model:value="regForm.account">
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="密码" v-model:value="regForm.password"/>
          </div>

          <div class="item">
            <a-input-password size="large"  placeholder="确认密码" v-model:value="regForm.subPwd" />
          </div>

          <div class="item">
            <a-input placeholder="邀请码" size="large" allow-clear v-model:value="regForm.inviteCode">
              <template v-slot:prefix>
                <DisconnectOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-button type="primary" @click="register">注册</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>