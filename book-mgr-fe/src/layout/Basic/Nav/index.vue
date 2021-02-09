<template>
  <div>
    <a-menu
      id="dddddd"
      style="width: 100%"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      v-for="item of menu"
      :key="item.url"
      v-only-admin="item.onlyAdmin"
    >
      <!-- 二级目录 -->
      <a-sub-menu
        v-if="item.children"
        :key="item.title"
      >
        <template #title>
          <span>
            <span>
              {{item.title}}
            </span>
          </span>
        </template>
        <!-- 二级目录Items -->
        <a-menu-item 
          :key="subItem.url"
          v-for="subItem of item.children"
          @click="to(subItem.url)"
        >
          {{subItem.title}}
        </a-menu-item>
      </a-sub-menu>
      <!-- 一级目录items -->
      <a-menu-item 
        @click="to(item.url)"
        :key="item.url" 
        v-else
      >
        {{item.title}}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>