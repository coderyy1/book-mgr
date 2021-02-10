import { defineComponent } from 'vue';
import Nav from './Nav/index.vue';
import { setToken } from '@/helpers/token';
import { useStore } from 'vuex';
import { Modal, message } from 'ant-design-vue';

export default defineComponent({
  components: {
    AppNav: Nav
  },
  setup() {
    const store = useStore();

    const logout = () => {
      Modal.confirm({
        title: '确认要登出吗?',
        cancelText: '取消',
        okText: '确认登出',
        onOk: () => {
          setToken('');

          window.location.href = '/';
        }
      });
    }


    return {
      store,
      logout
    }
  }
});