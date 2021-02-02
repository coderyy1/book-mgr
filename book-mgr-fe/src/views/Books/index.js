import { defineComponent, ref, onMounted } from 'vue';
import Add from './Add/index.vue';
import { book } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';


export default defineComponent({
  components: {
    Add
  },
  setup() {
    const column = [
      {
        title: '书名',
        dataIndex: 'name'
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '类别',
        dataIndex: 'classify'
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '出版日期',
        dataIndex: 'publishDate',
        slots: {
          customRender: 'publishDate'
        }
      }
    ];

    // 书籍list信息
    const list = ref([]);

    const total = ref(0);

    // 当前页数
    const currentPage = ref(1);

    // 控制modal显示
    const showAdd = ref(false);

    // 搜索
    const keyword = ref('');

    // 显示返回
    const showBack = ref(false);

    // 请求List
    const getList = async () => {
      const res = await book.list({
        page: currentPage.value,
        keyword: keyword.value
      });

      result(res)
        .success(({ data }) => {
          const {
            list: l,
            total: t
          } = data;
          list.value = l;
          total.value = t;
        });
    }

    // 获取书籍list
    onMounted( () => {
      getList();
    });

    // 更新书籍List
    const updateList = () => {
      getList();
    };

    // 切页方法
    const setPage = (page) => {
      currentPage.value = page;

      getList();
    };

    // 搜索书籍的方法
    const search = () => {
      currentPage.value = 1;
      getList();
      showBack.value = Boolean(keyword.value);
    }

    // 返回
    const back = () => {
      keyword.value = '';
      search();
      showBack.value = false;
    }

    

    return {
      column,
      showAdd,
      list,
      updateList,
      formatTimestamp,

      currentPage,
      total,
      setPage,

      keyword,
      search,
      back,
      showBack
    }
  }
});