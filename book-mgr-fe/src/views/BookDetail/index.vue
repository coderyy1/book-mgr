<template>
  <div>
    <!-- 基础信息 -->
    <a-spin :spinning="topLoading">
      <a-card class="hover-card">
        <space-between>
          <h2>{{ b.name }}</h2>
          <div class="actions" v-only-admin>
            <a-button type="primary"
            @click="showUpdate = true">
              编辑
            </a-button>
            &nbsp;
            <a-button type="danger" @click="removeBook">
              删除
            </a-button>
          </div>
        </space-between>
        <a-divider />
        <div class="info">
          <div class="item-row">
            <div class="item-col">
              <div class="title">作者</div>
              <div class="content">{{ b.author }}</div>
            </div>
            <div class="item-col">
              <div class="title">价格</div>
              <div class="content">{{ b.price }}</div>
            </div>
            <div class="item-col">
              <div class="title">分类</div>
              <div class="content">{{ b.classify }}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item-col">
              <div class="title">出版日期</div>
              <div class="content">{{ formatTimestamp(b.publishDate) }}</div>
            </div>
          </div>
        </div>
      </a-card>
    </a-spin>
    <!-- 出入库日志 -->
    <div class="log">
      <a-spin :spinning="bottomLoading">
        <a-card class="hover-card" title="出入库日志">
          <!-- <space-between>
            <h3>出入库日志</h3>
            <div class="actions">
              <a href="">出库日志</a>
              <a href="">入库日志</a>
            </div>
          </space-between>
          <a-divider /> -->
          <template #extra >
            <span>
              <a href="javascript:;" 
                @click="toggleFlag('IN_COUNT')">
                <span 
                  v-if="logFlag === 'IN_COUNT'"
                >
                  >
                </span>
                入库日志
              </a>
            </span>
            <span style="margin-left: 12px;">
              <a href="javascript:;" 
                @click="toggleFlag('OUT_COUNT')">
                <span 
                  v-if="logFlag === 'OUT_COUNT'"
                >
                  >
                </span>
                出库日志
              </a>
            </span>
          </template>
          <a-table 
            rowKey="_id" 
            :columns="column" 
            :data-source="logInfo"
            bordered 
            :pagination="false"
          >
            <template #type="data">
              {{data.text.type === 'IN_COUNT' ? '入库' : '出库'}}
            </template>
            <template #createdAt="data">
              {{formatTimestamp(data.text.meta.createdAt)}}
            </template>
          </a-table>
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
    </div>
    <!-- 修改的modal -->
    <update 
      v-model:isShow="showUpdate" 
      :info="b" 
      @updateList="getData(id)"
    />
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>