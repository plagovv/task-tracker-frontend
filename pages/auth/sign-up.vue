<script setup lang="ts">
import { Form } from "vee-validate";
import { string, ref as yupRef } from "yup";
import { useSignUp } from "~/api/useSignUp.api";

definePageMeta({
  layout: "auth",
  title: "Регистрация",
  name: "sign-up",
});

const { error, loading, signUp } = useSignUp();
const router = useRouter();

const username = ref(null);
const password = ref(null);

async function onSubmit() {
  await signUp({ username: username.value, password: password.value });
  if (error) {
    console.error(error);
  } else {
    router.push({ name: "sign-in", query: { username: username.value } });
  }
}
</script>

<template>
  <Form id="sign-up" @submit="onSubmit">
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
</template>

<style scoped></style>
