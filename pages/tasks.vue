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
        таски!
      </h1>
    </client-only>
  </div>
</template>

<style scoped></style>
