<script setup lang="ts">
import { history } from "@tiptap/pm/history";
const props = withDefaults(
  defineProps<{
    active?: boolean;
    value?: string;
    loading: boolean;
    error?: boolean;
  }>(),
  { value: "", loading: false },
);

const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert prose-sm sm:prose-base focus:outline-none  prose-p:my-1 w-full max-w-[70ch]",
    },
  },
  content: props.value,
  extensions: [TiptapStarterKit],
  editable: false,
  injectCSS: true,
  onCreate: () => emits("updateHeight"),
  onUpdate: (e) => {
    disabledSave.value = !e.editor.getText();
    emits("updateHeight");
  },
  onFocus: (e) => {
    disabledSave.value = !e.editor.getText();
    emits("updateHeight");
  },
});

const emits = defineEmits<{
  (e: "save", data: string | undefined): void;
  (e: "cancel" | "updateHeight"): void;
}>();

const disabledSave = ref<boolean>(false);

watch(
  () => props.active,
  (editable) => {
    if (typeof editor.value === "object") {
      editor.value.setEditable(editable);
      if (editable) {
        editor.value.chain().focus().run();
      }
    }
  },
  { immediate: true },
);

watch(() => props.value, reloadContent);

function save() {
  emits("save", editor.value?.getHTML() || "");
}

function cancel() {
  emits("cancel");
  reloadContent(props.value);
}

function reloadContent(value: string) {
  editor.value?.commands.setContent(value);
  clearHistory();
}

function clearHistory() {
  nextTick(() => {
    editor.value?.unregisterPlugin("history");
    editor.value?.registerPlugin(history());
  });
}

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>

<template>
  <div
    class="dark:bg-slate-900 rounded-md bg-white shadow-lg ring-1 dark:ring-slate-200/20 ring-black ring-opacity-5"
  >
    <t-tiptap-panel v-if="props.active" :editor="editor" />
    <TiptapEditorContent :editor="editor" @keydown.esc="emits('cancel')" />
    <div
      v-if="props.active"
      class="flex items-center justify-end border-t border-gray-200/20 p-1 gap-x-1"
    >
      <div
        v-if="props.error"
        class="flex items-center justify-center text-red-500 mr-auto"
      >
        <Icon icon="mdi:error" size="20" class="mr-2" />
        Ошибка сохранения
      </div>

      <t-progress v-if="props.loading" stroke-width="6" size="20" />

      <t-button
        size="sm"
        pain
        icon="mdi:undo-variant"
        :disabled="!editor?.can().undo()"
        @click="editor?.chain().focus().undo().run()"
      />

      <t-button
        size="sm"
        pain
        icon="mdi:redo-variant"
        :disabled="!editor?.can().redo()"
        @click="editor?.chain().focus().redo().run()"
      />
      <t-button size="sm" pain @click="cancel()"> Отмена </t-button>
      <t-button
        size="sm"
        :disabled="props.loading || disabledSave"
        @click="save"
      >
        Сохранить
      </t-button>
    </div>
  </div>
</template>

<style scoped></style>
