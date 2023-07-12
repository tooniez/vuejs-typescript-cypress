<template>
  <div class="home">
    Posts = {{ postsList.length }}
    <button @click="proceedTo">
      Proceed to todos page
    </button>
    <button @click="increaseCount">count is: {{ count }}</button>
    {{ test }}
    <TestComponent :test="'wertey'" @close="close"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PostsService from '../services/Posts/PostsService';
import IPostResponse from '../models/Responses/IPostResponse';
import TestComponent from '../components/TestComponent.vue';

export default defineComponent({
  components: {
    TestComponent,
  },
  name: 'HomeView',
  setup() {
    const postsList = ref([] as IPostResponse[]);
    const router = useRouter();
    const store = useStore();
    const proceedTo = () => {
      router.push('/todos');
    }

    const state = reactive({
      count: 0,
      test: 'wertey'
    });

    const increaseCount = () => {
      state.count++;
    }

    const close = (data: any) => {
      console.log('tts', data);
    }

    onMounted(async () => {
      try {
        const { data } = await PostsService.getPosts();
        await store.dispatch('setPosts', data);
        postsList.value = data;
      } catch (e) {
        console.error(e)
      }
    })

    return {
      postsList,
      proceedTo,
      increaseCount,
      close,
      ...toRefs(state),
    }
  }
});
</script>
