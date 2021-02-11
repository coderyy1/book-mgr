<template>
  <div>
    <!-- 总数据 -->
    <div class="total-info">
      <a-card
        
      >
        <div class="total-list">
          <div class="total-item">
            <div class="num">{{ `共${totalBook}本` }}</div>
            <div class="des">书籍</div>
          </div>
          <div class="total-item">
            <div class="num">{{ `共${totalUser}位` }}</div>
            <div class="des">用户</div>
          </div>
          <div class="total-item">
            <div class="num">{{ `共${totalLog}条` }}</div>
            <div class="des">日志</div>
          </div>
        </div>
      </a-card>
    </div>
    <!-- 表格信息 -->
    <div class="table-info">
      <!-- 书籍 -->
      <div class="t-book">
        <books :simple="true"/>
      </div>
      <!-- 日志 -->
      <div class="t-log">
        <log :simple="true" />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>