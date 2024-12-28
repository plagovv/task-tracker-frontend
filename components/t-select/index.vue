<script setup lang="ts">
import { getRandString } from "~/utils";
import { watch } from "vue";
import type { DefaultSelectItem } from "~/components/t-select/t-select";
import useClickOutside from "~/composables/useClickOutside";

const {
  items = [],
  label = null,
  name,
} = defineProps<{
  name: string;
  items: Array<DefaultSelectItem>;
  label?: string;
  placeholder?: string;
}>();

const selectId = getRandString();
const showItems = ref(false);
const activatorWidth = ref<null | number>(null);
const selectedItem = ref<DefaultSelectItem | null>(null);

const slots = useSlots();
const activatorItem = useTemplateRef("select");
const model = defineModel<unknown>({ default: null });

if (model.value) {
  selectedItem.value = items.find((item) => item.value === model.value) || null;
  if (selectedItem.value === null) {
    selectedItem.value = {
      label: model.value as string,
      value: model.value as string,
    };
  }
}

watch(
  selectedItem,
  (newValue) => {
    model.value = newValue?.value;
  },
  { deep: true },
);

useClickOutside(() => {
  showItems.value = false;
}, [activatorItem]);

function updateWidth() {
  activatorWidth.value = activatorItem.value?.clientWidth || null;
}

function onShowItems() {
  updateWidth();
  showItems.value = true;
}

function onSelectItem(item: DefaultSelectItem) {
  selectedItem.value = item;
  showItems.value = false;
}
</script>

<template>
  <div class="mt-2 w-full">
    <label
      v-if="label"
      :for="name"
      class="dark:text-white text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</label
    >
    <button
      ref="select"
      type="button"
      class="grid w-full cursor-default grid-cols-1 rounded-md bg-white dark:bg-slate-800 py-1.5 pl-3 pr-2 text-left text-gray-900 dark:text-gray-100 focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
      @click="onShowItems"
    >
      <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
        <slot
          v-if="slots?.selectedItem && selectedItem"
          name="selectedItem"
          :item="selectedItem"
        />
        <slot
          v-else-if="slots?.item && selectedItem"
          name="item"
          :item="selectedItem"
          :selected="false"
        />
        <span v-else class="block truncate text-gray-500">
          {{ selectedItem?.label || placeholder || label || "" }}
        </span>
      </span>

      <Icon
        icon="mdi:chevron-up-down"
        class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 dark:text-gray-10 sm:size-4"
      />
    </button>
    <ul
      v-if="showItems"
      class="absolute z-[100] .grainy mt-1 overflow-auto rounded-md bg-white dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm grainy-effect"
      :style="{ width: activatorWidth ? `${activatorWidth}px` : 'auto' }"
    >
      <li
        v-for="(item, i) in items"
        :key="selectId + '_' + i"
        class="cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 hover:bg-gray-600/10"
        @click="onSelectItem(item)"
      >
        <slot
          v-if="slots?.item"
          :key="selectId + '_' + i"
          name="item"
          :item="item"
          :selected="selectedItem?.value === item.value"
        />
        <template v-else>
          <div class="flex items-center">
            <span class="ml-3 block truncate font-normal">
              {{ item.label }}
            </span>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
