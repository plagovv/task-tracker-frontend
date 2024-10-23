<script setup lang="ts">
definePageMeta({
  title: "Задачи",
});

const mainState = useMainStore();
</script>

<template>
  <div>
    <h1>Привет! Скоро здесь появятся таски! :)</h1>
    <t-button @click="mainState.logout()"> Выход </t-button>
  </div>
</template>

<style scoped></style>
