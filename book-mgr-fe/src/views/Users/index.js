import { defineComponent, ref, onMounted } from 'vue';
import { result, formatTimestamp } from '@/helpers/utils';
import { user } from '@/network';
import { message, Modal } from 'ant-design-vue';
import Add from './Add/index.vue';

export default defineComponent({
  components: {
    Add
  },
  setup() {

    const column = [
      {
        title: '用户名',
        dataIndex: 'account'
      },
      {
        title: '权限',
        dataIndex: ''
      },
      {
        title: '创建日期',
        slots: {
          customRender: 'createdAt'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      }
    ];

    const list = ref([]);
    const total = ref(0);
    const currentPage = ref(1);

    const showAdd = ref(false);

    const keyword = ref('');

    const showBack = ref(false);


    // 获取用户list
    const getUserList = async () => {
      const res = await user.list(currentPage.value, 4, keyword.value);
      result(res)
        .success((data) => {
          list.value = data.list;
          total.value = data.total;
        });
    }

    // 切页方法
    const setPage = (page) => {
      currentPage.value = page;

      getUserList();
    }

    // 删除用户信息的方法
    const remove = (id) => {
      Modal.confirm({
        title: '确认删除该用户信息吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await user.removeUser(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getUserList();
            });
        }
      });
    }

    // 重置密码的方法
    const resetPwd = (id) => {
      Modal.confirm({
        title: '即将重置该用户密码，确定吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const res = await user.resetPwd(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
            });
        }
      });
    }

    // 搜索用户的方法
    const search = async () => {
      currentPage.value = 1;
      getUserList();
      showBack.value = Boolean(keyword.value);
    }

    // 搜索的返回方法
    const back = () => {
      keyword.value = '';
      search();
      showBack.value = false;
    }

    onMounted(() => {
      getUserList();
    })


    return {
      list,
      total,
      currentPage,
      setPage,
      column,
      formatTimestamp,
      remove,
      showAdd,
      getUserList,
      resetPwd,
      keyword,
      search,
      showBack,
      back
    }
  }
});