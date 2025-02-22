// import type { NuxtApp } from "#app";
import { useAsync } from "~/composables/useAsync";
import type { SignInRequest } from "~/apiServices/AuthService";

export const useMainStore = defineStore("main", () => {
  const router = useRouter();
  // globalLoader
  const globalLoading = ref<boolean>(false);
  // token
  const token = useCookie<string | undefined>("token", {
    default: () => undefined,
    sameSite: "strict",
    watch: true,
    maxAge: 60 * 60,
  });
  const refreshToken = useCookie<string | undefined>("refresh", {
    default: () => undefined,
    sameSite: "strict",
    watch: true,
    maxAge: 2 * 60 * 60,
  });
  // user
  const user = ref();
  // action: login
  const login = async (username: string, password: string) => {
    const { $services } = useNuxtApp();
    const {
      error,
      data,
      execute: signIn,
    } = useAsync($services.auth.login, { context: $services.auth });
    await signIn(username, password);
    if (!error.value && data?.value != null) {
      setAuthData(data.value);
    } else throw error.value;
  };
  // action: getMe
  const getMe = async () => {
    const { $services } = useNuxtApp();
    const {
      error,
      data,
      execute: getMe,
    } = useAsync($services.auth.getMe, { context: $services.auth });
    globalLoading.value = true;
    await getMe();
    if (!error.value && data?.value != null) {
      //console.log(data.value);
      user.value = data.value;
    } else {
      console.warn("getMe Error", error.value);
      // global error
    }
    globalLoading.value = false;
  };
  // action: logout
  const logout = (redirect: boolean = true) => {
    token.value = undefined;
    refreshToken.value = undefined;
    user.value = undefined;
    if (redirect) router.push("/");
  };
  const setLoading = (value: boolean) => {
    globalLoading.value = value;
  };
  const setAuthData = (value: SignInRequest) => {
    token.value = value?.accessToken;
    refreshToken.value = value?.refreshToken;
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
    setAuthData,
  };
});
