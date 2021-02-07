<template>
  <div class="wrapper">
    <a-spin :spinning="loading">
      <a-card>
        <!-- 标题 -->
        <h2 class="title">图书列表</h2>
        <a-divider />
        <!-- 搜索框 -->
        <space-between>
          <!-- 下拉选择 -->
          <!-- <a-select
            v-model:value="value1"
            style="width: 60px"
            ref="select"
          >
            <a-select-option value="jack">
              Jack
            </a-select-option>
            <a-select-option value="111">
              111
            </a-select-option>
          </a-select>
          {{value1}} -->
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据书名搜索"
              v-model:value="keyword"
              enter-button
              allowClear
              @search="search"
            />
            <a href="javascript:;"
              @click="back"
              v-if="showBack"
            >
              返回
            </a>
          </div>
          <!-- 添加书籍按钮  -->
          <a-button @click="showAdd = true" v-only-admin>添加书籍</a-button>
        </space-between>
        <a-divider />
        <!-- 表格 -->
        <a-table 
          rowKey="_id" 
          :columns="column" 
          :data-source="list" 
          bordered
          :pagination="false"
        >
          <template #publishDate="data">
            {{ formatTimestamp(data.record.publishDate) }}
          </template>

          <template #actions="data">
            <space-between>
              <a href="javascript:;" 
                class="btn btn-success btn-sm"
                @click="gotoDetail(data.text)">
                详情
              </a>
              <a href="javascript:;" 
                class="btn btn-warning btn-sm"
                @click="updateBook(data.text)"
                v-only-admin>
                修改
              </a>
              <a href="javascript:;"
                class="btn btn-danger btn-sm"
                @click="removeBook(data.text)"
                v-only-admin>
                删除
              </a>
            </space-between>
          </template>

          <template #count="data">
            <space-between>
              <a href="javascript:;" @click="editCount('OUT_COUNT', data.text)" v-only-admin>出库</a>
              {{ data.text.count }}
              <a href="javascript:;" @click="editCount('IN_COUNT', data.text)" v-only-admin>入库</a>
            </space-between>
          </template>
        </a-table>
        <!-- 分页组件 -->
        <space-between class="pagi">
          <div></div>
          <a-pagination 
            v-model:current="currentPage"
            :total="total"
            :page-size="10"
            @change="setPage"
          />
        </space-between>
      </a-card>
    </a-spin>

    <!-- 添加书籍的modal -->
    <add v-model:isShow="showAdd" @updateList="updateList" />

    <!-- 修改书籍的modal -->
    <update v-model:isShow="showUpdate" :info="currentBookInof" @updateList="updateList"/>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>