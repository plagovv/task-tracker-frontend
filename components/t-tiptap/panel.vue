<script setup lang="ts">
import type { Editor } from "@tiptap/core";

const props = withDefaults(defineProps<{ editor?: Editor }>(), {
  editor: undefined,
});

const buttons = ref([
  {
    icon: "mdi:format-bold",
    activeName: "bold",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleBold().run,
    click: () => props.editor?.chain().focus().toggleBold().run(),
  },
  {
    icon: "mdi:format-italic",
    activeName: "italic",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleItalic().run,
    click: () => props.editor?.chain().focus().toggleItalic().run(),
  },
  {
    icon: "mdi:format-strikethrough",
    activeName: "strike",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleStrike().run,
    click: () => props.editor?.chain().focus().toggleStrike().run(),
  },
  {
    icon: "mdi:format-list-bulleted",
    activeName: "bulletList",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleBulletList().run,
    click: () => props.editor?.chain().focus().toggleBulletList().run(),
  },
  {
    icon: "mdi:format-list-numbered",
    activeName: "orderedList",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleOrderedList().run,
    click: () => props.editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: "mdi:code-block-braces",
    activeName: "codeBlock",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleCodeBlock().run,
    click: () => props.editor?.chain().focus().toggleCodeBlock().run(),
  },
  {
    icon: "mdi:comment-quote-outline",
    activeName: "blockquote",
    activeOptions: {},
    disabled: () => props.editor?.can().chain().focus().toggleBlockquote().run,
    click: () => props.editor?.chain().focus().toggleBlockquote().run(),
  },
  {
    icon: "mdi:format-clear",
    click: () => {
      props.editor?.chain().focus().unsetAllMarks().run();
      props.editor?.chain().focus().clearNodes().run();
    },
  },
]);
</script>

<template>
  <div v-if="editor" class="flex border-b border-gray-200/20">
    <t-button
      v-for="btn in buttons"
      :key="btn.icon"
      size="sm"
      pain
      :icon="btn.icon"
      :disabled="btn?.disabled ? !btn.disabled() : false"
      :active="
        btn.activeName
          ? editor.isActive(btn.activeName, btn?.activeOptions || {})
          : undefined
      "
      @click="btn.click"
    />
    <!-- TODO: to select
    <t-button
      size="sm"
      :active="editor.isActive('paragraph')"
      @click="editor.chain().focus().setParagraph().run()"
    >
      paragraph
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 1 })"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      h1
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 2 })"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      h2
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 3 })"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      h3
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 4 })"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 5 })"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      h5
    </t-button>
    <t-button
      size="sm"
      :active="editor.isActive('heading', { level: 6 })"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      h6
    </t-button>


    <t-button
      size="sm"
      pain
      icon="mdi:comment-quote-outline"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      @click="editor.chain().focus().toggleBlockquote().run()"
    />
    <t-button
      size="sm"
      pain
      icon="mdi:align-horizontal-center"
      @click="editor.chain().focus().setHorizontalRule().run()"
    />
    <t-button size="sm" @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </t-button>
    <t-button
      size="sm"
      icon="mdi:undo-variant"
      :disabled="!editor.can().chain().focus().undo().run()"
      @click="editor.chain().focus().undo().run()"
    />
    <t-button
      size="sm"
      icon="mdi:redo-variant"
      :disabled="!editor.can().chain().focus().redo().run()"
      @click="editor.chain().focus().redo().run()"
    />
    -->
  </div>
</template>

<style scoped></style>
