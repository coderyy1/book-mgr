<template>
  <div>
    <a-card
      title="重置密码申请列表"
    >
    <a-spin :spinning="loading" >
      <a-table
        rowKey="_id" 
        :columns="column" 
        :data-source="list" 
        bordered
        :pagination="false"
      >
        <!-- 状态 -->
        <template #time="data" >
          {{ formatTimestamp(data.text.meta.createdAt) }}
        </template>
        <!-- 状态 -->
        <template #status="data" >
          {{ data.text.status === 1 ? '待处理' : '已解决' }}
        </template>
        <!-- 操作 -->
        <template #actions="data" >
          <div class="actions-btn">
            <a 
              href="javascript:;" 
              class="btn btn-success btn-sm"
              @click="doActions(data.text._id, 2)"
            >
              重置密码
            </a>
            <a 
              href="javascript:;" 
              class="btn btn-warning btn-sm"
              @click="doActions(data.text._id, 3)"
            >
              忽略
            </a>
          </div>
        </template>


      </a-table>
      <div class="pagi">
        <a-pagination 
          v-model:current="currentPage"
          :total="total"
          :page-size="2"
          @change="setPage"
        />
      </div>
    </a-spin>
    </a-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>