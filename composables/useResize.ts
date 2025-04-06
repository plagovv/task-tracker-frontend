export default function useResize(callback: () => void) {
  onMounted(() => {
    window.addEventListener("resize", callback);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", callback);
  });
}
