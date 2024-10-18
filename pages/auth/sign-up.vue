<script setup lang="ts">
import { Form } from "vee-validate";
import { string, ref as yupRef } from "yup";

definePageMeta({
  layout: "auth",
  title: "Регистрация",
  name: "sign-up",
});

const username = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);

const refForm = useTemplateRef("formm");

const log = () => {
  console.log(refForm.value.getMeta());
};

const onSubmit = () => {
  console.log({ username: username.value, password: password.value });
};
</script>

<template>
  <Form id="sign-up" ref="formm" @submit="onSubmit">
    <t-input
      v-model="username"
      name="username"
      label="Имя пользователя"
      :rule="string().required().min(4)"
    />
    <t-input
      v-model="password"
      name="password"
      label="Пароль"
      type="password"
      :rule="string().required().min(6)"
      :vee-options="{ label: 'password' }"
    />
    <t-input
      v-model="passwordConfirm"
      name="passwordConfirm"
      label="Подтверждение пароля"
      type="password"
      :rule="
        string()
          .required()
          .min(6)
          .oneOf([yupRef('$password')])
      "
    />
    <t-button class="mt-4 w-full" type="submit"> Зарегистрироваться </t-button>
    <t-devider @click="log">
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
