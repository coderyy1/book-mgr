import { defineComponent, ref, onMounted } from 'vue';
import Add from './Add/index.vue';
import { book } from '@/network';
import { result } from '@/helpers/utils';


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
        dataIndex: 'publishDate'
      }
    ];

    // 书籍list信息
    const list = ref(list);

    // 控制modal显示
    const showAdd = ref(false);

    // 获取书籍list
    onMounted( async () => {
      const res = await book.getList();

      result(res)
        .success(({ data }) => {
          list.value = data;
        });
    });

    // 更新书籍List
    const updateList = async () => {
      const res = await book.getList();

      result(res)
        .success(({ data }) => {
          list.value = data;
        });
    }

    return {
      column,
      showAdd,
      list,
      updateList
    }
  }
});