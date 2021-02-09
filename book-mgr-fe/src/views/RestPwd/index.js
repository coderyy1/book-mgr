import { defineComponent, ref, onMounted } from 'vue';
import { reset } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils/index.js';
import { message, Modal } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const column = [
      {
        title: '用户名',
        dataIndex: 'account',
      },
      {
        title: '时间',
        slots: {
          customRender: 'time'
        }
      },
      {
        title: '状态',
        slots: {
          customRender: 'status'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      }
    ];

    const currentPage = ref(1);
    const total = ref(0);

    const list = ref([]);

    const loading = ref(true);

    // 获取列表的方法
    const getList = async () => {
      loading.value = true;
      const res = await reset.list(currentPage.value, 2); 
      result(res)
        .success((data) => {
          list.value = data.data;
          total.value = data.total;

          loading.value = false;
        });

    }

    // 切页的方法
    const setPage = (page) => {
      currentPage.value = page;
      getList();
    }

    // 重置密码操作的方法
    const doActions = (id, status) => {
      const info = status === 2 ? '确认重置密码吗?' : '确认忽略请求吗?';
      Modal.confirm({
        title: info,
        cancelText: '取消',
        okText: '确认',
        onOk: async () => {
          const res = await reset.updateStatus({
            id,
            status
          });
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            });
        }
      });
    }

    onMounted(() => {
      getList();
    });

    return {
      currentPage,
      total,
      list,
      loading,
      column,

      getList,
      setPage,
      doActions,
      formatTimestamp
    }
  }
});