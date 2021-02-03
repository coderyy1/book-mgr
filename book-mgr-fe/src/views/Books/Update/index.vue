<template>
  <div>
    <!-- modal组件 -->
    <a-modal
      title="修改书籍"
      :visible="props.isShow"
      okText="确认修改"
      cancelText="取消"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{span: 6}">
        <a-form-item label="书名">
          <a-input v-model:value="updateForm.name" allowClear/>
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="updateForm.author" allowClear/>
        </a-form-item>
        <a-form-item label="类别">
          <a-input v-model:value="updateForm.classify" allowClear/>
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number v-model:value="updateForm.price" id="inputNumber1" :min="0" :max="999999" />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="updateForm.publishDate" :allowClear="false" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
