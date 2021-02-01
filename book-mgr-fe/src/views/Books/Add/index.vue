<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="添加书籍"
      :visible="props.isShow"
      okText="添加"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="书名">
          <a-input v-model:value="addForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" allowClear/>
        </a-form-item>
        <a-form-item label="类别">
          <a-input v-model:value="addForm.classify" allowClear/>
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number v-model:value="addForm.price" id="inputNumber" :min="0" :max="999999" />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
