<script setup lang="ts">
const props = defineProps<{ title: string; closed?: boolean }>();
const show = ref<boolean>(true);

if (props.closed) {
  show.value = false;
}

const dropdownEl = ref<null | HTMLDivElement>(null);
onMounted(() => {
  watch(
    () => show.value,
    (val) => {
      const el = dropdownEl.value;
      if (el) el.style.height = `${val ? el.scrollHeight : 0}px`;
    },
    { immediate: true },
  );
});
</script>

<template>
  <t-card class="mb-2">
    <div
      class="divide-y divide-slate-700 duration-100"
      :class="{ 'divide-none': !show }"
    >
      <div
        class="flex items-center py-1 px-2 cursor-pointer hover:bg-slate-700 duration-200 rounded-t-md select-none"
        :class="{ 'rounded-md': !show }"
        @click="show = !show"
      >
        <Icon
          icon="mdi:chevron-up"
          size="18"
          class="mr-1 origin-center rotate-90 duration-300 ease-in-out"
          :class="{ ' rotate-180': show }"
        />
        <span> {{ title }} </span>
      </div>
      <div
        ref="dropdownEl"
        class="overflow-hidden duration-300 ease-in-out w-full"
      >
        <div class="py-1 px-2">
          <slot />
        </div>
      </div>
    </div>
  </t-card>
</template>

<style scoped></style>
