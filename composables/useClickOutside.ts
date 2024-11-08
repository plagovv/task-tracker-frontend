import type { ShallowRef } from "vue";
import { onMounted, onBeforeUnmount } from "vue";

/**
 * Хук для работы с нажатием вне элемента
 * @param callback - функция без возврата
 * @param excludeComponents массив ref элементов полученных через хук useTemplateRef, минимум один элемент должен быть
 */
export default function useClickOutside<T = unknown>(
  callback: () => void,
  excludeComponents: ReadonlyArray<ShallowRef<T | null>> = [],
) {
  if (excludeComponents.length === 0) {
    throw new Error(
      "В параметре excludeComponents должен быть хотя бы один элемент",
    );
  }

  if (!callback) {
    throw new Error("Функция callback не назначена");
  }

  const listener = (event: Event) => {
    if (
      excludeComponents.some(
        (component) =>
          event.target === component.value ||
          event.composedPath().includes(component.value as EventTarget),
      )
    ) {
      return;
    }
    if (typeof callback === "function") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });
}
