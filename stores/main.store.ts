import { useSighIn } from "~/composables/api/useSignIn.api";
import { useGetMeApi } from "~/composables/api/useGetMe.api";
// import type { NuxtApp } from "#app";
import type { SignInRequest } from "~/types/api/signIn.interface";

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
    const { error, data, signIn } = useSighIn();
    //const nuxtApp: NuxtApp = useNuxtApp();
    await signIn({ username, password });
    if (!error.value && data?.value != null) {
      setAuthData(data.value);
    } else throw error;
  };
  // action: getMe
  const getMe = async () => {
    const { error, data, getMe } = useGetMeApi();
    globalLoading.value = true;
    await getMe();
    if (!error.value) {
      //console.log(data.value);
      user.value = data.value;
    } else {
      console.warn("getMe Error", error);
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
