import { useSighIn } from "~/api/useSignIn.api";
import { useGetMe } from "~/api/useGetMe";
import type { NuxtApp } from "#app";

export const useMainStore = defineStore("main", () => {
  const router = useRouter();
  // globalLoader
  const globalLoading = ref<boolean>(false);
  // token
  const token = useCookie<string | undefined>("token", {
    default: () => undefined,
    sameSite: "strict",
    watch: true,
    maxAge: 24 * 60 * 60,
  });
  const refreshToken = useCookie<string | undefined>("refresh", {
    default: () => undefined,
    sameSite: "strict",
    watch: true,
    maxAge: 24 * 60 * 60,
  });
  // user
  const user = ref();
  // action: login
  const login = async (username: string, password: string) => {
    const { error, data, signIn } = useSighIn();
    const nuxtApp: NuxtApp = useNuxtApp();
    await signIn({ username, password });
    if (!error.value) {
      token.value = data.value?.accessToken;
      nuxtApp.$axios.defaults.headers.common["Authorization"] =
        `Bearer ${data.value?.accessToken}`;
      refreshToken.value = data.value?.refreshToken;
    } else throw error;
  };
  // action: getMe
  const getMe = async () => {
    const { error, data, getMe } = useGetMe();
    globalLoading.value = true;
    await getMe();
    if (!error.value) {
      console.log(data);
      user.value = data.value;
    } else {
      // global error
    }
    globalLoading.value = false;
  };
  // action: logout
  const logout = (redirect: boolean = true) => {
    token.value = undefined;
    refreshToken.value = undefined;
    if (redirect) router.push("/");
  };
  const setLoading = (value: boolean) => {
    globalLoading.value = value;
  };
  return {
    token,
    refreshToken,
    globalLoading,
    user,
    login,
    getMe,
    logout,
    setLoading,
  };
});
