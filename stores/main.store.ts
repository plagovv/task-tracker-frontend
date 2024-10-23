import { useSighIn } from "~/api/useSignIn.api";

export const useMainStore = defineStore("main", () => {
  const router = useRouter();
  // globalLoader
  const showGlobalLoader = ref(false);
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
    await signIn({ username, password });
    if (!error.value) {
      token.value = data.value?.accessToken;
      refreshToken.value = data.value?.refreshToken;
    } else throw error;
  };
  // action: getMe
  const getMe = async () => {};
  // action: logout
  const logout = async () => {
    token.value = undefined;
    refreshToken.value = undefined;
    router.push("/");
  };
  return {
    token,
    refreshToken,
    user,
    login,
    getMe,
    logout,
  };
});
