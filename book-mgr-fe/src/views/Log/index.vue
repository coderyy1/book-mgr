<template>
  <div>
    <a-spin :spinning="loading">
      <a-card :title="simple ? '最近操作日志' : ''">
        <div v-if="!simple">
          <div class="title">
            <h2>操作日志</h2>
          </div>
          <a-divider />
        </div>
        <a-table
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
          :scroll="{ x: 'max-content' }"
        >

        </a-table>
        <div class="pagi" v-if="!simple">
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