import { defineComponent, ref, onMounted } from 'vue';
import { log } from '@/network';
import { result } from '@/helpers/utils/index.js';
import { getLogInfoByPath } from '@/helpers/log/index.js';

export default defineComponent({
  setup() {
    const column = [
      {
        title: '用户名',
        dataIndex: 'user.account'
      },
      {
        title: '动作',
        dataIndex: 'action'
      },

    ]

    const list = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const loading = ref(true);

    const getList = async () => {
      loading.value = true;
      const res = await log.list(currentPage.value, 10);
      result(res)
        .success((data) => {
          data.data.forEach((item) => {
            item.action = getLogInfoByPath(item.request.url);
          });
          list.value = data.data;
          total.value = data.total;
          loading.value = false;
        });
    }


    const setPage = (page) => {
      currentPage.value = page;
      getList();
    }


    onMounted(() => {
      getList();
    });


    return {
      column,
      list,
      currentPage,
      total,


      getList,
      setPage,
      loading
    }
  }
});