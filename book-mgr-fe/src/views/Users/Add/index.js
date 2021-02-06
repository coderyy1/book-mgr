import { defineComponent, reactive } from 'vue';
import { user } from '@/network/index';
import { result, clone } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const defaultFormData = {
  account: '',
  password: ''
};

export default defineComponent({
  props: {
    isShow: Boolean
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {

      // 表单校验
      if(addForm.account === '') {
        message.info('请输入用户名');

        return;
      }
      if(addForm.password === '') {
        message.info('请输入密码');

        return;
      }
      if(addForm.password.length < 6 || addForm.password.length > 12) {
        message.error('密码为6~12位');

        return;
      }

      const form = clone(addForm);

      // 发送请求
      const res = await user.add(form);

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