<script setup lang="ts">
import type { ComponentExposed } from "vue-component-type-helpers";
import type { THeader, TDrawer } from "#components";

const route = useRoute();

/* Drawer Logic */
const minimizedDrawer = ref<boolean>(false);

const toggleDrawer = () => {
  minimizedDrawer.value = !minimizedDrawer.value;
};

const mainPage = computed(() => route.name === "index");

const headerRef = useTemplateRef<ComponentExposed<typeof THeader>>("header");
const headerHeight = ref<number>(0);

const drawerRef = useTemplateRef<ComponentExposed<typeof TDrawer>>("drawer");
const drawerWidth = ref<number>(0);

onMounted(() => {
  console.log(route.name);
  headerHeight.value = headerRef.value?.$el.offsetHeight;
  drawerWidth.value = drawerRef.value?.$el.offsetWidth;
});

onUpdated(() => {
  headerHeight.value = headerRef.value?.$el.offsetHeight;
  drawerWidth.value = drawerRef.value?.$el.offsetWidth;
});
</script>

<template>
  <div id="tt-app" class="block absolute left-0 top-0 bottom-0 right-0">
    <t-header ref="header" @toggle-drawer="toggleDrawer" />
    <t-drawer
      ref="drawer"
      :minimise="minimizedDrawer"
      :hide="mainPage"
      :style="{ top: `${headerHeight}px` }"
    >
      <t-projects-list :minimise="minimizedDrawer" />
    </t-drawer>
    <div
      class="absolute right-0 bottom-0 overflow-y-visible z-10"
      :style="{ top: `${headerHeight}px`, left: `${drawerWidth}px` }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
