<script setup lang="ts">
definePageMeta({
  title: "Задачи",
  layout: "default",
  middleware: ["auth-protect"],
});

const mainState = useMainStore();
</script>

<template>
  <div>
    <client-only>
      <h1>
        Привет, {{ mainState?.user?.username || "---" }}! Скоро здесь появятся
        таски! :) ГЛОБ:
        {{ mainState.globalLoading ? "Загрузка..." : "0" }}
      </h1>
      <t-button @click="mainState.logout()"> Выход </t-button>
    </client-only>
  </div>
</template>

<style scoped></style>
