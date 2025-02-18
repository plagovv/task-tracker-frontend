<script setup lang="ts">
import { Form } from "vee-validate";
import { string } from "yup";
import { useMainStore } from "~/stores/main.store";
import type { RequestError } from "~/types/api/error.interface";

definePageMeta({
  layout: "auth",
  title: "Авторизация",
});

const mainStore = useMainStore();
const router = useRouter();
const route = useRoute();

const form = useTemplateRef("from");

const username = ref("");
const password = ref();

const warning = ref<RequestError | null>(null);
const loading = ref(false);

async function onSubmit() {
  try {
    loading.value = true;
    await mainStore.login(username.value, password.value);
    const afterRoute = route.query["after-route"];
    if (typeof afterRoute === "string") {
      router.push(afterRoute);
    } else {
      router.push({ name: "tasks" });
    }
  } catch (e: unknown) {
    warning.value = e as RequestError;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (route.query["auth-warning"] !== undefined) {
    warning.value = {
      message: "Для просмотра страницы требуется авторизация",
      code: 1,
    } as RequestError;
  }
  if (typeof route.query?.username === "string") {
    username.value = route.query.username;
    form.value?.setFieldValue("username", username.value);
  }
});
</script>

<template>
  <div>
    <t-alert
      v-if="warning"
      :type="warning.code > 100 ? 'danger' : 'warning'"
      :title="warning.code > 100 ? 'Ошибка' : 'Внимание'"
      :text="warning?.message"
    />
    <Form id="sing-in" ref="from" @submit="onSubmit">
      <t-input
        v-model="username"
        name="username"
        label="Имя пользователя"
        :rule="string().required()"
        :disabled="loading"
      />
      <t-input
        v-model="password"
        name="password"
        label="Пароль"
        type="password"
        :rule="string().required()"
        :disabled="loading"
      />
      <t-button class="mt-4 w-full" type="submit" :loading="loading">
        Вход
      </t-button>
      <t-devider>
        Нет аккаунта? &nbsp;
        <NuxtLink
          :to="{ name: 'sign-up' }"
          class="text-purple-500 hover:text-purple-400 transition-colors"
        >
          Зарегистрируйся
        </NuxtLink>
      </t-devider>
    </Form>
  </div>
</template>

<style scoped></style>
