import { defineComponent, ref, onMounted, reactive } from 'vue';
import { result, formatTimestamp } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import { user } from '@/network';
import { message, Modal } from 'ant-design-vue';
import Add from './Add/index.vue';
import { EditOutlined } from '@ant-design/icons-vue';
import store from '@/store';


export default defineComponent({
  components: {
    Add, EditOutlined
  },
  setup() {

    const column = [
      {
        title: '用户名',
        dataIndex: 'account'
      },
      {
        title: '角色',
        slots: {
          customRender: 'character'
        }
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

    const showCharacterModal = ref(false);

    const loading = ref(true);

    const editForm = reactive({
      character: '',
      current: {}
    });


    // 获取用户list
    const getUserList = async () => {
      loading.value = true;
      const res = await user.list(currentPage.value, 4, keyword.value);
      result(res)
        .success((data) => {
          list.value = data.list;
          total.value = data.total;

          loading.value = false;
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

    // 修改角色
    const onEdit = (record) => {
      editForm.current = record;
      editForm.character = record.character;
      showCharacterModal.value = true;
    }

    const updateCharacter = async () => {
      const res = await user.updateCharacter(editForm.character, editForm.current._id);
      result(res)
        .success((data) => {
          message.success(data.msg);
        });

      showCharacterModal.value = false;

      getUserList();
    }

    onMounted(() => {
      getUserList();
    })


    return {
      list,
      total,
      currentPage,
      column,
      formatTimestamp,
      showAdd,
      keyword,
      showBack,
      getCharacterInfoById,
      showCharacterModal,
      editForm,
      characterInfo: store.state.characterInfo,
      loading,


      updateCharacter, 
      onEdit,
      back,
      search,
      resetPwd,
      getUserList,
      remove,
      setPage
    }
  }
});