export default defineNuxtRouteMiddleware((to) => {
  const mainStore = useMainStore();

  if (!mainStore?.token || !mainStore?.user) {
    return navigateTo(`/auth?auth-warning=1&after-route=${to.fullPath}`, {
      redirectCode: 301,
    });
  }
});
