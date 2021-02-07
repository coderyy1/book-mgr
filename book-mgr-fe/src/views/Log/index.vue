<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="title">
          <h2>操作日志</h2>
        </div>
        <a-divider />
        <a-table
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
        >

        </a-table>
        <div class="pagi">
          <a-pagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="10"
            @change="setPage"
          />
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss'
</style>