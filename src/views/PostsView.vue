<template>
  <div class="container mx-auto">
    <h1 class="mt-8 text-2xl">Posts</h1>

    <div class="col-span-6">
      <div class="p-8 bg-white shadow-md rounded">
        <h2 class="text-xl">
          <template v-if="!isEditMode">
            Add a Post
          </template>
          <template v-else>
            Edit the Post
          </template>
        </h2>
        <input type="text"
               v-model="post.title"
               class="p-2 mt-4 border rounded w-full"> <br>
        <input type="text"
               v-model="post.body"
               class="p-2 mt-4 border rounded w-full"> <br>
        <button @click="buttonEventHandler">
          <template v-if="!isEditMode">
            Add new Post
          </template>
          <template v-else>
            Edit the Post
          </template>
        </button>
      </div>
    </div>

    <div class="mt-3">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 space-y-4 px-1"
             style="height: 500px">
          <div v-for="post in posts"
               :key="post.id"
               class="p-8 bg-white shadow-md rounded flex items-center justify-between">
            <div>
              <div>{{ post.title }}</div>
              <div>{{ post.body }}</div>
            </div>
            <div class="space-x-2">
              <button class="px-2 text-red-600"
                      @click="deletePost(post.id)"
                      title="Remove todo">Delete</button>
              <button
                  @click="selectPost(post.id)"
                      class="px-2 text-orange-600"
                      title="Mark as undone">edit</button>
            </div>
          </div>
          <div v-if="!posts.length"
               class="px-8 py-16 bg-white text-gray-700 shadow-md rounded text-sm">
            You dont have any posts.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed, reactive, ref} from 'vue';
import { useStore } from 'vuex';
import PostsService from '../services/Posts/PostsService';

export default defineComponent({
  name: 'PostsView',
  setup() {
    let postsList = ref([] as any[]);
    let post = ref({
      title: '',
      body: '',
      userId: 1,
      id: Math.random() * 100,
    })
    const isEditMode = ref(false);
    const store = useStore();

    const posts = computed(() => store.getters.posts || []);

    onMounted( async ()=> {
      if (store.getters.posts.length) {
        postsList.value = store.getters.posts;
      } else {
        try {
          const { data } = await PostsService.getPosts();
          await store.dispatch('setPosts', data);
          postsList.value = data;
        } catch (e) {
          console.error(e)
        }
      }
    })

    const selectPost = (id: number) => {
      isEditMode.value = true;
      const selectedPost = postsList.value.find((item) => item.id === id);
      post.value = selectedPost;
    }

    const editPost = async () => {
      try {
        const response = await PostsService.editPost(post.value.id);
        console.log('response', response.data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const currentIndex = postsList.value.findIndex((item) => item.id === response.data.id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const currentPost = postsList.value.find((item) => item.id === response.data.id);
        postsList.value.splice(currentIndex, 1, currentPost);
        isEditMode.value = false;
      } catch (e) {
        console.error(e);
      }
    }

    const buttonEventHandler = async () => {
      if (isEditMode.value) {
        await editPost();
      } else {
        await addPost();
      }
    }

    const addPost = async () => {
      try {
        const response = await PostsService.addPost(post.value);
        const newPostsList = [response.data, ...postsList.value];
        await store.dispatch('setPosts', newPostsList);
        post.value.title = '';
        post.value.body = '';
      } catch (e) {
        console.error(e)
      }
    }

    const deletePost = async (id: number) => {
      if (confirm('Are you sure?')) {
        await PostsService.deletePost(id);
        const filteredPosts = postsList.value.filter((item) => item.id !== id);
        postsList.value = filteredPosts;
      }
    }

    return {
      posts,
      post,
      isEditMode,
      deletePost,
      buttonEventHandler,
      selectPost,
    }
  }
});
</script>