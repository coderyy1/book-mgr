<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="添加用户"
      :visible="props.isShow"
      okText="添加"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="用户名">
          <a-input v-model:value="addForm.account" allowClear/>
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" allowClear/>
        </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
