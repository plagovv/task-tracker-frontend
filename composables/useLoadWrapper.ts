// export const useLoadWrapper = <Err, Data>(method: Promise<Data>) => {
//   const error = ref<Err | unknown>(null);
//   const loading = ref(false);
//   const data = ref<Data | unknown>(null);
//   const run = async () => {
//     try {
//       loading.value = true;
//       const res: Data = await method;
//       data.value = res;
//     } catch (e: Err) {
//       error.value = e;
//     } finally {
//       loading.value = false;
//     }
//   };
//
//   return { error, loading, data, run };
// };
