<script setup lang="ts">
const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [TiptapStarterKit],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<template>
  <div
    class="dark:bg-slate-900 rounded-md bg-white shadow-lg ring-1 dark:ring-slate-200/20 ring-black ring-opacity-5"
  >
    <div v-if="editor" class="flex border-b border-gray-200/20">
      <t-button
        size="sm"
        pain
        icon="mdi:format-bold"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <t-button
        size="sm"
        pain
        icon="mdi:format-italic"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <t-button
        size="sm"
        pain
        icon="mdi:format-strikethrough"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      <t-button
        size="sm"
        pain
        icon="mdi:code-braces"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      />
      <t-button size="sm" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </t-button>
      <t-button size="sm" @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </t-button>
      <!-- TODO: to select -->
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        paragraph
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        h1
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        h2
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        h3
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      >
        h4
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      >
        h5
      </t-button>
      <t-button
        size="sm"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      >
        h6
      </t-button>

      <t-button
        size="sm"
        pain
        icon="mdi:format-list-bulleted"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <t-button
        size="sm"
        pain
        icon="mdi:format-list-numbered"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />
      <t-button
        size="sm"
        pain
        icon="mdi:code-block-braces"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      />
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
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<style scoped></style>
