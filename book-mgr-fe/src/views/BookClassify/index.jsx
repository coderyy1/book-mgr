import { defineComponent, ref, onMounted } from 'vue';
import { classify } from '@/network';
import { result } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const column = [
      {
        title: '类别',
        dataIndex: 'title',
      },
      {
        title: '操作',
        width: '280px',
        slots: {
          customRender: 'actions'
        }
      }
    ];

    const list = ref([]);
    const title = ref('');
    const loading = ref(true);

    // 获取list的方法
    const getList = async () => {
      loading.value = true;
      const res = await classify.list();
      result(res)
        .success((data) => {
          list.value = data.data;
          loading.value = false;
        });
    }

    // 添加的方法
    const addClassify = async () => {
      if(!title.value) {
        message.error('请输入分类名称');
        return;
      }
      const res = await classify.add({
        title: title.value
      });
      result(res)
        .success((data) => {
          message.success(data.msg);
          title.value = '';
          getList();
        });
    }

    // 删除的方法
    const remove = (id) => {
      Modal.confirm({
        title: '确认删除该分类吗?',
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          const res = await classify.removeClassify(id);
          result(res)
            .success((data) => {
              message.success(data.msg);
              getList();
            });
        }
      });
    }

    // 修改的方法
    const updateClassify = (id) => {
      Modal.confirm({
        title: '修改分类信息',
        okText: '确认删除',
        cancelText: '取消',
        content: (
          <div>
            <Input class="__book_classify" placeholder="请输入分类名"/>
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector('.__book_classify');
          const res = await classify.update({
            id,
            title: el.value
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
      column,
      list,
      title,
      loading,

      addClassify,
      getList,
      remove,
      updateClassify
    }
  }
});