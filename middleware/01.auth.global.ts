import isEmpty from "lodash/isEmpty";

export default defineNuxtRouteMiddleware(async (to) => {
  const mainStore = useMainStore();

  if (
    to.fullPath.includes("/auth") &&
    (!!mainStore.token || !!mainStore.refreshToken)
  ) {
    console.log("auth-global: redirect to /");
    return navigateTo("/", { redirectCode: 301 });
  }

  if (isEmpty(mainStore.user) && !!mainStore.token) {
    await mainStore.getMe();
  }
});
