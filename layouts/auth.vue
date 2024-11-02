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
  <div class="dark:bg-state-900 auth-layout min-h-screen flex pt-40 pb-20">
    <main class="grow">
      <section class="relative">
        <div
          class="block absolute blur-2xl z-[-10] inset-x-0 left-1/2 transform -translate-x-1/2 -mt-36"
        >
          <img
            src="/image/auth-illustration.svg"
            alt="Page Illustration"
            class="src"
          />
        </div>
        <div class="ml-auto mr-auto text-center pb-3 max-w-3xl">
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
        <div class="max-w-6xl mx-auto max-w-sm">
          <NuxtPage />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="postcss"></style>
