<script setup lang="ts">
import { Form } from "vee-validate";
import { string } from "yup";
import { useSighIn } from "~/api/useSignIn.api";

definePageMeta({
  layout: "auth",
  title: "Авторизация",
});

const { error, loading, signIn } = useSighIn();
const router = useRouter();
const route = useRoute();

const username = ref(route.query.username || null);
const password = ref(null);

async function onSubmit() {
  await signIn({ username: username.value, password: password.value });
  if (error) {
    // TODO: Сделать Alerts
    console.error(error);
  } else {
    // TODO: Сохранить токен
    router.push({ name: "tasks" });
  }
}
</script>

<template>
  <Form id="sing-in" @submit="onSubmit">
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
</template>

<style scoped></style>
