import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { book, inventoryLog } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue';
import Update from '../Books/Update/index.vue';

export default defineComponent({
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const showUpdate = ref(false);

    const bookInfo = ref({});
    const logInfo = ref([]);

    const total = ref(0);

    const currentPage = ref(1);

    const topLoading = ref(true);
    const bottomLoading = ref(true);

    const logFlag = ref('IN_COUNT');

    const column = [
      {
        title: '操作',
        slots: {
          customRender: 'type'
        }
      },
      {
        title: '数量',
        dataIndex: 'num'
      },
      {
        title: '操作者',
        dataIndex: 'user'
      },
      {
        title: '操作时间',
        slots: {
          customRender: 'createdAt'
        }
      }
    ]

    // 获取书籍信息的方法
    const getData = async (id) => {
      topLoading.value = true;
      const res = await book.detail(id);
      result(res)
        .success(({data}) => {
          bookInfo.value = data;

          topLoading.value = false;
        });
    }

    // 获取出入库日志的方法
    const getLogInfo = async () => {
      bottomLoading.value = true;
      const res = await inventoryLog.getLog(id, logFlag.value, currentPage.value
      );
      result(res)
        .success((data) => {
          logInfo.value = data.list;
          total.value = data.total;

          bottomLoading.value = false;
        });
    }

    // 切页功能
    const setPage = (page) => {
      currentPage.value = page;

      getLogInfo();
    }

    onMounted(() => {
      getData(id);
      getLogInfo();
    });

    // 删除书籍的方法
    const removeBook = async () => {
      Modal.confirm({
        title: '确认删除该书籍吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await book.deleteBook(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              router.replace('/books');
            });
        }
      });
    }

    // 筛选日志类型
    const toggleFlag = (type) => {
      logFlag.value = type;
      currentPage.value = 1;
      getLogInfo();
    }

    const logs = () => {
      console.log(logInfo.value);
    }

    return {
      id,
      b: bookInfo,
      formatTimestamp,
      removeBook,
      getData,
      showUpdate,
      logInfo,
      logs,
      total,
      currentPage,
      setPage,
      column,
      logFlag,
      topLoading,
      bottomLoading,
      toggleFlag
    }
  }
});