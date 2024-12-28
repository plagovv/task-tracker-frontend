<script setup lang="ts">
import { type FieldOptions, type RuleExpression, useField } from "vee-validate";

const props = withDefaults(
  defineProps<{
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    textArea?: boolean;
    rule?: MaybeRef<RuleExpression<unknown>>;
    veeOptions?: Partial<FieldOptions<unknown>>;
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    type: undefined,
    disabled: false,
    rule: undefined,
    veeOptions: undefined,
    textArea: false,
  },
);

const { errorMessage, meta, value } = useField(
  () => props.name,
  props.rule,
  props.veeOptions,
);

const inputType = computed(() => props.type || "text");
</script>

<template>
  <div class="mt-2 w-full transition-all">
    <label
      v-if="label"
      :for="$attrs.name as string"
      class="block dark:text-white text-sm font-medium leading-6 text-gray-900"
    >
      {{ props.label }}
    </label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        v-if="!textArea"
        v-bind="$attrs"
        :id="name"
        v-model="value"
        :disabled="disabled"
        :type="inputType"
        :name="name"
        :class="{
          'bg-gray-200': disabled,
          'ring-1 ring-red-500 focus:ring-red-500':
            errorMessage && meta.touched,
        }"
        class="block w-full dark:bg-slate-800 dark:text-white rounded-md border-0 py-1.5 px-3 text-gray-900 ring-inset ring-gray-300 placeholder:text-indigo-500 focus:ring-1 focus:ring-purple-500 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
        :placeholder="props.placeholder"
      />
      <textarea
        v-else
        v-bind="$attrs"
        :id="name"
        v-model="value as string"
        :disabled="disabled"
        :type="inputType"
        :name="name"
        :class="{
          'bg-gray-200': disabled,
          'ring-1 ring-red-500 focus:ring-red-500':
            errorMessage && meta.touched,
        }"
        class="block w-full dark:bg-slate-800 dark:text-white rounded-md border-0 py-1.5 px-3 text-gray-900 ring-inset ring-gray-300 outline-none placeholder:text-indigo-500 focus:ring-1 focus:ring-purple-500 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
        :placeholder="props.placeholder"
      />
    </div>
    <div v-if="errorMessage && meta.touched" class="text-red-400 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped></style>
