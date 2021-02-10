import { defineComponent, reactive, watch } from 'vue';
import { book } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import moment from 'moment';


export default defineComponent({
  props: {
    isShow: Boolean,
    info:  Object,
    classify: Array
  },
  setup(props, context) {
    const updateForm = reactive({
      name: '',
      author: '',
      classify: '',
      price: 0,
      publishDate: ''
    });

    watch(() => props.info, (current) => {
      Object.assign(updateForm, current);
      updateForm.publishDate = moment(Number(updateForm.publishDate));
    });

    const submit = async () => {

      // 表单校验
      if(updateForm.name === '') {
        message.info('请输入书名');

        return;
      }
      if(updateForm.author === '') {
        message.info('请输入作者名');

        return;
      }
      if(updateForm.classify === '') {
        message.info('请输分类');

        return;
      }
      if(updateForm.publishDate === '') {
        message.info('请选择出版日期');

        return;
      }

      const form = {
        id: updateForm._id,
        author: updateForm.author,
        price: updateForm.price,
        name: updateForm.name,
        classify: updateForm.classify
      };
      form.publishDate = updateForm.publishDate.valueOf();

      // 发送请求
      const res = await book.update(form);

      // 处理结果
      result(res)
      // 成功
      .success((data) => {
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
      updateForm,
      props,
      submit,
      close
    }
  }
});