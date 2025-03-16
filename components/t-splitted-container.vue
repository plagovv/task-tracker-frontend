<script setup lang="ts"></script>

<template>
  <div class="flex align-center w-full">
    <div class="left w-1/2">
      <slot name="left" />
    </div>
    <div class="right w-1/2">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped></style>
