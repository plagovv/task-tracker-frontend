<script setup lang="ts">
const props = defineProps<{
  title: string;
  closed?: boolean;
  bordered?: boolean;
}>();
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
  <t-card class="mb-2" :class="{ '!ring-0 shadow-none': !props.bordered }">
    <div
      class="duration-100"
      :class="{
        'divide-y divide-slate-700': props.bordered,
        'divide-none': !show,
      }"
    >
      <div
        class="flex items-center py-1 px-2 cursor-pointer duration-200 select-none group"
        :class="{
          'hover:bg-slate-700 rounded-t-md': props.bordered,
          'rounded-md': !show && props.bordered,
        }"
        @click="show = !show"
      >
        <div
          class="flex items-center mr-1"
          :class="{
            'bg-white/10 group-hover:bg-white/20 rounded-md': !props.bordered,
          }"
        >
          <Icon
            icon="mdi:chevron-up"
            size="18"
            class="origin-center rotate-90 duration-300 ease-in-out"
            :class="{
              '!rotate-180': !show,
            }"
          />
        </div>
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
