<template>
  <div>
    <a-card>
      <div class="title">
        <h2>分类管理</h2>
        <div class="ip">
          <a-input class="input-el" v-model:value="title"></a-input>
          <a-button 
            type="primary" 
            @click="addClassify"
          >
            添加
          </a-button>
        </div>
      </div>
      <a-divider />
      <a-spin :spinning="loading" >
        <a-table
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
        >
          <template #actions="data" >
            <div class="actions">
              <a href="javascript:;" 
                class="btn btn-warning btn-sm"
                @click="updateClassify(data.text._id)"
              >
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm"
                @click="remove(data.text._id)"
              >
                删除
              </a>
            </div>
          </template> 
        </a-table>
      </a-spin>
    </a-card>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>