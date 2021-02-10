import { defineComponent, ref } from 'vue';
import { profile } from '@/network';
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils';
import { setToken } from '@/helpers/token';

export default defineComponent({
  setup() {
    const oldPwd = ref('');
    const newPwd = ref('');
    const submiPwd = ref('');

    const updatePwd = async () => {
      // 校验
      if(oldPwd.value === '') {
        message.error('请输入原密码');
        return;
      }
      if(newPwd.value === '') {
        message.error('请输入新密码');
        return;
      }
      if(newPwd.value.length < 6 || newPwd.value.length > 12) {
        message.error('密码为6~12位');
        return;
      }
      if(submiPwd.value !== newPwd.value) {
        message.error('两次输入的密码不一致');
        return;
      }


      // 请求
      const res = await profile.update({
        newPassword: newPwd.value,
        oldPassword: oldPwd.value
      });
      result(res)
        .success((data) => {
          message.success(data.msg);
          oldPwd.value = '';
          newPwd.value = '';
          submiPwd.value = '';
          logout();
        });
    }

    // 登出
    const logout = () => {
      setToken('');
      window.location.href = '/';
    }

    return {
      oldPwd,
      newPwd,
      submiPwd,

      updatePwd,
      logout
    }
  }


});