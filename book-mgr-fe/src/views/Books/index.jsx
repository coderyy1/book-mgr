import { defineComponent, ref, onMounted, reactive } from 'vue';
import Add from './Add/index.vue';
import Update from './Update/index.vue';
import { book } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';


export default defineComponent({
  components: {
    Add, Update
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
      },
      {
        title: '库存',
        slots: {
          customRender: 'count'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
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
    const showUpdate = ref(false);

    // 要传给修改modal中的数据
    const currentBookInof = ref({});

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

    // 删除书籍的底层方法
    const remove = async (item) => {

      const { _id } = item;
      const res = await book.deleteBook(_id);
      result(res)
        .success((data) => {
          message.success(data.msg);

          getList();
        })
    }

    // 删除按钮方法
    const removeBook = (item) => {
      Modal.confirm({
        title: '确认删除该书籍吗？',
        okText: '确认',
        cancelText: '取消',
        onCancel() {},
        onOk(){
          remove(item);
        }
      })
    }

    // 显示入库出库弹窗
    const editCount = (type, data) => {

      let word = '增加';
      if(type === 'OUT_COUNT') {
        word = '减少';
      }

      Modal.confirm({
        title: `要${word}多少库存?`,
        content: (
          <div>
            <Input class="__book_input_count" />
          </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          const el = document.querySelector('.__book_input_count');

          const res = await book.updateCount({
            id: data._id,
            type,
            num: el.value
          });

          result(res)
            .success(() => {
              message.success(`成功${word}${el.value}本《${data.name}》`);
              getList();
            });
        }
      });
    }

    // 修改书籍方法
    const updateBook = (data) => {
      showUpdate.value = true;
      currentBookInof.value = data;

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
      showBack,
      removeBook,
      editCount,
      showUpdate,
      updateBook,
      currentBookInof
    }
  }
});