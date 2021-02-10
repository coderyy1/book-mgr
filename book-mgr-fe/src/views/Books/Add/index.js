import { defineComponent, reactive } from 'vue';
import { book } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const defaultFormData = {
  name: '',
  author: '',
  classify: '',
  price: 0,
  publishDate: '',
  count: 0
};

export default defineComponent({
  props: {
    isShow: Boolean,
    classify: Array
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {

      // 表单校验
      if(addForm.name === '') {
        message.info('请输入书名');

        return;
      }
      if(addForm.author === '') {
        message.info('请输入作者名');

        return;
      }
      if(addForm.classify === '') {
        message.info('请输分类');

        return;
      }
      if(addForm.publishDate === '') {
        message.info('请选择出版日期');

        return;
      }

      const form = clone(addForm);
      form.publishDate = addForm.publishDate.valueOf();

      // 发送请求
      const res = await book.add(form);

      // 处理结果
      result(res)
      // 成功
      .success((data) => {
        // 重置表单
        Object.assign(addForm, defaultFormData);
        // 提示成功
        message.success(data.msg);
        // 更新list
        context.emit('updateList');
        // 关闭modal
        close();
      })
    }

    // 改变父组件传来的值
    const close = () => {
      context.emit('update:isShow', false);
    }

    return {
      addForm,
      submit,
      props,
      close
    }
  }
});