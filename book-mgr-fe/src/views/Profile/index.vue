<template>
  <div>
    <a-card >
      <h2>修改密码</h2>
      <a-divider />
      <div class="input-wrapper">
        <div class="item-wrapper">
          <div class="item">
            <span>请输入原密码：</span>
            <a-input-password size="large"
              v-model:value="oldPwd"
              class="input-el" 
            />
          </div>
          <div class="item">
            <span>请输入新密码：</span>
            <a-input-password size="large"
              v-model:value="newPwd"
              class="input-el" 
            />
          </div>
          <div class="item">
            <span>确认新密码：</span>
            <a-input-password size="large"
              v-model:value="submiPwd"
              class="input-el" 
            />
          </div>
        </div>
        <a-button 
          size="large" 
          type="primary" 
          @click="updatePwd"
        >
          确认修改
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>