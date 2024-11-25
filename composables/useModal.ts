import type TModal from "~/components/t-modal.vue";
import type { ComponentExposed } from "vue-component-type-helpers";

export default function useModal(modalRefName: string) {
  const modalComponent =
    useTemplateRef<ComponentExposed<typeof TModal>>(modalRefName);

  function open(): void {
    modalComponent.value?.open();
  }
  return {
    open,
    close() {
      modalComponent.value?.close();
    },
  };
}
