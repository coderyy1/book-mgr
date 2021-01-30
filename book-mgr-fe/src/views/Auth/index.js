import { defineComponent, reactive } from 'vue';
import { UserOutlined, DisconnectOutlined, LockOutlined } from '@ant-design/icons-vue';
import { auth } from '@/network';

export default defineComponent({
  components: {
    UserOutlined, DisconnectOutlined, LockOutlined
  },
  setup() {
    const regForm = reactive({
      account: '',
      password: ''
    });

    // 注册的逻辑
    const register = () => {
      auth.register(regForm.account, regForm.password);
    }

    return {
      regForm,
      register
    }
  }
});