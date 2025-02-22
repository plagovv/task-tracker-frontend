<script setup lang="ts">
import { Form } from "vee-validate";
import { string, ref as yupRef } from "yup";
import { useAsync } from "~/composables/useAsync";

definePageMeta({
  layout: "auth",
  title: "Регистрация",
  name: "sign-up",
});

const { $services } = useNuxtApp();
const {
  error,
  loading,
  execute: signUp,
} = useAsync(() => $services.auth.register(username.value, password.value));
const router = useRouter();

const username = ref();
const password = ref();

async function onSubmit() {
  await signUp();
  if (!error.value) {
    router.push({ name: "auth", query: { username: username.value } });
  }
}
</script>

<template>
  <div id="sign-up">
    <t-alert v-if="error" type="danger" title="Ошибка" :text="error?.message" />
    <Form @submit="onSubmit">
      <t-input
        v-model="username"
        label="Имя пользователя"
        name="username"
        :disabled="loading"
        :rule="string().required().min(4)"
      />
      <t-input
        v-model="password"
        label="Пароль"
        name="password"
        type="password"
        :disabled="loading"
        :rule="string().required().min(6)"
      />
      <t-input
        label="Подтверждение пароля"
        name="passwordConfirm"
        type="password"
        :disabled="loading"
        :rule="
          string()
            .required()
            .min(6)
            .oneOf([yupRef('$password')])
        "
      />
      <t-button class="mt-4 w-full" type="submit" :loading="loading">
        Зарегистрироваться
      </t-button>
      <t-devider>
        Есть аккаунт? &nbsp;
        <NuxtLink
          :to="{ name: 'auth' }"
          class="text-purple-500 hover:text-purple-400 transition-colors"
        >
          Войди
        </NuxtLink>
      </t-devider>
    </Form>
  </div>
</template>

<style scoped></style>
