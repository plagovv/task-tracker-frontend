<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Привет! Это главная страница!</h1>
    <router-link to="/tasks/list">Задачи</router-link>
    <router-link to="/auth">Авторизация</router-link>
  </div>
</template>

<style scoped></style>
