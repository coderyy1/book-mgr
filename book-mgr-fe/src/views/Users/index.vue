<template>
  <div>
    <a-card>
      <div class="title">
        <h3>用户管理</h3>
      </div>
      <a-divider />
      <div class="actions">
        <space-between>
          <div class="search-wrapper">
            <a-input-search
              class="search"
              placeholder="根据用户名搜索"
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
          <a-button @click="showAdd = true">
            添加用户
          </a-button>
        </space-between>
      </div>
      <a-divider />
      <a-table
        rowKey="_id" 
        :columns="column" 
        :data-source="list" 
        bordered
        :pagination="false"
      >
        <template #character="data">
          <a href="javascript:;"
            @click="onEdit(data.text)"
          >
            <EditOutlined />
          </a>
          {{ getCharacterInfoById(data.text.character).title  }}
        </template>
        <template #createdAt="data">
          {{ formatTimestamp(data.text.meta.createdAt) }}
        </template>
        <template #actions="data">
          <div class="tb-actions">
            <a href="javascript:;"
              class="btn btn-warning btn-sm"
              @click="resetPwd(data.text._id)"
            >
              重置密码
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
      <div class="pagi">
        <a-pagination 
          v-model:current="currentPage"
          :total="total"
          :page-size="4"
          @change="setPage"
        />
      </div>
    </a-card>

    <!-- 添加用户的modal -->
    <add 
      v-model:isShow="showAdd"
      @updateList="getUserList"
    />

    <!-- 修改角色信息的modal -->
    <a-modal
      v-model:visible="showCharacterModal"
      title="修改角色"
      okText="确认修改"
      cancelText="取消"
      @ok="updateCharacter"
    >
      <a-select
        v-model:value="editForm.character"
        style="width: 220px;"
      >
        <a-select-option 
          v-for="item of characterInfo"
          :key="item._id"
          :value="item._id"
        >
          {{item.title}}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';

</style>