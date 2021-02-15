import { defineComponent, ref, onMounted } from 'vue';
import menu from '@/config/menu/index.js';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const openKeys = ref([]);

    const selectedKeys = ref([]);

    const router = useRouter();
    const route = useRoute();

    // 跳转方法
    const to = (url) => {
      router.push(url);
    }

    onMounted(() => {
      selectedKeys.value = [route.path];
      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if(child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });


    return {
      openKeys,
      selectedKeys,
      menu,

      to
    }
  }
});