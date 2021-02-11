import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Add from './Add/index.vue';
import Update from './Update/index.vue';
import { book, classify } from '@/network';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
import { useStore } from 'vuex';


export default defineComponent({
  props: {
    simple: Boolean
  },
  components: {
    Add, Update
  },
  setup(props) {
    const column = [
      {
        title: '书名',
        dataIndex: 'name',
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
      }
    ];

    if(!props.simple) {
      column.push(
        {
          title: '操作',
          slots: {
            customRender: 'actions'
          }
        });
    }

    // 书籍list信息
    const list = ref([]);

    const total = ref(0);

    const store = useStore();

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

    const router = useRouter();

    const loading = ref(true);

    const classifyList = ref([]);

    // 获取分类列表
    const getClassify = async () => {
      const res = await classify.list();
      result(res)
        .success((data) => {
          classifyList.value = data.data;
        });
    }

    // 请求List
    const getList = async () => {
      loading.value = true;
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

          loading.value = false;
        });
    }

    // 获取书籍list
    onMounted( () => {
      getClassify();
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
      // window.scrollTo(0, 0)
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
            num: el.value,
            user: store.state.userInfo.account
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

    // 跳转详情页面
    const gotoDetail = (data) => {
      router.push({
        path: `/books/${data._id}`
      });
    }

    return {
      column,
      showAdd,
      list,
      keyword,
      formatTimestamp,
      showBack,
      currentPage,
      total,
      showUpdate,
      currentBookInof,
      loading,
      classifyList,
      simple: props.simple,



      setPage,
      updateList,
      search,
      back,
      removeBook,
      editCount,
      updateBook,
      gotoDetail,
      getClassify
    }
  }
});