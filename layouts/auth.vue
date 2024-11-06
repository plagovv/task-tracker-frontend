<script setup lang="ts">
const route = useRoute();

watch(
  () => route.meta.title,
  (title) => useSeoMeta({ title: title as string }),
);

useSeoMeta({
  title: route.meta.title as string,
});
</script>

<template>
  <div
    class="dark:bg-state-900 auth-layout min-h-screen flex flex-col overflow-hidden [@supports(overflow:clip)]:overflow-clip"
  >
    <main class="grow">
      <section class="relative">
        <div
          class="md:block absolute blur-2xl opacity-70 z-[-10] left-1/2 transform -translate-x-1/2 -mt-36 pointer-events-none"
        >
          <img
            src="/image/auth-illustration.svg"
            class="max-w-none"
            width="1440"
            height="450"
          />
        </div>
        <div
          class="ml-auto mr-auto text-center max-w-3xl pt-32 pb-12 md:pt-40 md:pb-20"
        >
          <div class="mb-6">
            <a href="" class="inline-flex">
              <div
                class="relative flex items-center justify-center border rounded-2xl w-16 h-16 border-transparent before before:bg-slate-800/30 before:absolute before:inset-0 before:rounded-2xl shadow-2xl icon-box"
              >
                <img
                  src="/image/logo.svg"
                  width="42"
                  height="42"
                  alt=""
                  class="relative"
                />
              </div>
            </a>
          </div>
          <h1
            class="text-[2.75rem] font-extrabold bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 bg-clip-text text-transparent"
          >
            {{ route.meta.title }}
          </h1>
        </div>
        <div class="mx-auto max-w-sm">
          <NuxtPage />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="postcss"></style>
