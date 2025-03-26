import type { HTMLAttributes, SetupContext, SlotsType, VNodeChild } from "vue";

type TButtonToggleProps = {
  multiple?: boolean;
  color?: string;
  divided?: boolean;
  rounded?: boolean;
} & HTMLAttributes;

type Events = {
  sendMessage(message: string): void;
};

type Slots = SlotsType<{
  default: () => VNodeChild[];
}>;

function TButtonToggle(
  props: TButtonToggleProps,
  context: SetupContext<Events, Slots>,
) {
  const slotContent = context.slots.default();
  return (
    <div>
      {slotContent.map((element) => {
        console.log(element);
        if (element && typeof element === "object" && !Array.isArray(element)) {
          const componentType = element.type as {
            name?: string;
            __name?: string;
          };
          if (
            componentType.name === "TButton" ||
            componentType.name === "t-button"
          ) {
            //element.props = { ...element.props, active: true };
            return element;
          }
        }
      })}
    </div>
  );
}

TButtonToggle.props = {
  modelValue: { type: [String, Number, null], default: null },
  multiple: { type: Boolean, required: false, default: false },
  color: { type: String, required: false, default: "primary" },
  divided: { type: Boolean, required: false, default: false },
  rounded: { type: Boolean, required: false, default: false },
};

TButtonToggle.emits = {
  sendMessage: (value: unknown) => typeof value === "string",
};

export default TButtonToggle;

// TODO: Дописать !
