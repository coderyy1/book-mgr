<template>
  <div class="wrapper">
    <a-card>
      <!-- 标题 -->
      <h2 class="title">图书列表</h2>
      <a-divider />
      <!-- 搜索框 -->
      <space-between>
        <a-input-search
          class="search"
          placeholder="根据书名搜索"
          enter-button
          allowClear
        />
        <!-- 添加书籍按钮  -->
        <a-button @click="showAdd = true">添加书籍</a-button>
      </space-between>
      <a-divider />
      <!-- 表格 -->
      <a-table rowKey="_id" :columns="column" :data-source="list" bordered>

      </a-table>
    </a-card>

    <!-- 添加书籍的modal -->
    <add v-model:isShow="showAdd" @updateList="updateList" />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>