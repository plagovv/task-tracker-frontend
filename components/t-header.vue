<script setup lang="ts">
import { TDropdown } from "#components";
import { ADD_MODAL_KEY } from "~/components/t-modals/modal-keys";

const mainState = useMainStore();
const route = useRoute();
const inTasks = computed(
  () => route.name === "tasks" || route.name === "tasks-list",
);
const dayjs = useDayjs();

const welcome = computed(() => {
  const hour = dayjs().hour();

  if (hour >= 0 && hour <= 3) {
    return "Доброй ночи";
  }

  if (hour >= 4 && hour <= 11) {
    return "Доброе утро";
  }

  if (hour >= 12 && hour <= 16) {
    return "Добрый день";
  }

  if (hour >= 17 && hour <= 23) {
    return "Добрый вечер";
  }

  return `err: ${hour}`;
});

const addModalOpenInjected = inject<() => void>(ADD_MODAL_KEY);
</script>

<template>
  <header class="w-100 flex items-center justify-between h-16 px-4 select-none">
    <!-- логотип -->
    <div class="flex-1 flex items-center">
      <t-button
        v-if="inTasks"
        rounded
        pain
        class="mr-2"
        icon="material-symbols:menu-rounded"
      />
      <NuxtLink href="/" class="cursor-pointer">
        <img
          src="/image/logo.svg"
          width="38"
          height="38"
          alt="Task Tracker"
          class="max-w-none"
        />
      </NuxtLink>
    </div>
    <!-- Не авторизован -->
    <div v-if="!mainState?.user" class="flex items-center justify-between">
      <NuxtLink href="/auth">
        <t-button outline rounded class="mr-3"> Вход </t-button>
      </NuxtLink>
      <NuxtLink href="/auth/sign-up">
        <t-button rounded> Регистрация </t-button>
      </NuxtLink>
    </div>
    <!-- Авторизован -->
    <template v-else>
      <t-button
        v-if="inTasks"
        rounded
        icon="material-symbols:add-rounded"
        class="mr-2"
        @click="addModalOpenInjected"
      />
      <NuxtLink v-else href="/tasks">
        <t-button rounded class="mr-2"> Мои задачи </t-button>
      </NuxtLink>
      <t-dropdown>
        <t-avatar rounded size="lg" />
        <template #content>
          <t-card class="w-72">
            <t-list>
              <div class="px-4 py-2">
                <p>{{ welcome }},</p>
                <p>
                  <span class="font-bold">
                    @{{ mainState?.user.username }}
                  </span>
                  !
                </p>
              </div>
              <t-list-item @click="mainState.logout()">
                <template #pre>
                  <icon name="material-symbols:exit-to-app-rounded" />
                </template>
                Выход
              </t-list-item>
            </t-list>
          </t-card>
        </template>
      </t-dropdown>
    </template>
  </header>
</template>

<style scoped></style>
