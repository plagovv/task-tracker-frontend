<script setup lang="ts">
import TAvatar from "~/components/t-avatar.vue";

const mainState = useMainStore();
const route = useRoute();
const inTasks = computed(() => route.name === "tasks");
</script>

<template>
  <header class="w-100 flex items-center justify-between h-16 px-4">
    <!-- логотип -->
    <div class="flex-1">
      <NuxtLink href="/" class="inline-flex">
        <img
          src="/image/logo.svg"
          width="38"
          height="38"
          alt="Task Tracker"
          class="max-w-none"
        />
      </NuxtLink>
    </div>
    <!-- Не авторизован -->
    <div v-if="!mainState?.user" class="flex items-center justify-between">
      <NuxtLink href="/auth">
        <t-button outline rounded class="mr-3"> Вход </t-button>
      </NuxtLink>
      <NuxtLink href="/auth/sign-up">
        <t-button rounded> Регистрация </t-button>
      </NuxtLink>
    </div>
    <!-- Авторизован -->
    <template v-else>
      <t-button
        v-if="inTasks"
        rounded
        icon="material-symbols:add-rounded"
        class="mr-2"
      />
      <NuxtLink v-else href="/tasks">
        <t-button rounded class="mr-2"> Мои задачи </t-button>
      </NuxtLink>
      <t-avatar
        rounded
        size="lg"
        src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg?w=50"
      />
      <div class=""></div>
    </template>
  </header>
</template>

<style scoped></style>
