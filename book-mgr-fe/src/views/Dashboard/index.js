import { defineComponent, ref, onMounted } from 'vue';
import Books from '../Books/index.vue';
import Log from '../Log/index.vue';
import { dashboard } from '@/network';
import { result } from '@/helpers/utils';

export default defineComponent({
  components: {
    Books, Log
  },
  setup() {


    const totalBook = ref(0);
    const totalUser = ref(0);
    const totalLog = ref(0);


    // 获取数据的方法
    const getData = async () => {
      const res = await dashboard.list();
      result(res)
        .success((data) => {
          totalBook.value = data.data.bookTotal;
          totalUser.value = data.data.userTotal;
          totalLog.value = data.data.logTotal;
        });
    }

    onMounted(() => {
      getData();
    });

    return {
      totalBook,
      totalLog,
      totalUser
    }
  }
});