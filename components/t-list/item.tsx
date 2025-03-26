import type { HTMLAttributes, SetupContext, SlotsType } from "vue";
import { NuxtLink } from "#components";
import type { RouteLocationRaw, RouterLinkProps } from "#vue-router";

interface ListItemProps extends Omit<RouterLinkProps, "to">, HTMLAttributes {
  to?: RouteLocationRaw;
  onClick?: () => void;
}

interface ListItemRouterLinkSlotData {
  isActive: boolean;
  isExactActive: boolean;
}

function ListItem(
  props: ListItemProps,
  {
    slots,
    attrs,
  }: SetupContext<
    unknown,
    SlotsType<{
      pre?: ListItemRouterLinkSlotData;
      default?: ListItemRouterLinkSlotData;
      actions?: ListItemRouterLinkSlotData;
    }>
  >,
) {
  const isLink = typeof props?.to !== "undefined";
  const isClickable = typeof attrs.onClick === "function" || isLink;

  const defaultSlot = (slotData?: ListItemRouterLinkSlotData) => [
    ...(typeof slots.pre === "function"
      ? [h("div", { class: "flex-none mr-2" }, slots.pre(slotData))]
      : []),
    h(
      "div",
      { class: "grow" },
      typeof slots?.default === "function" ? slots?.default(slotData) : "",
    ),
    ...(typeof slots.actions === "function"
      ? [h("div", { class: "flex-none ml-2" }, slots.actions(slotData))]
      : []),
  ];
  const classes = {
    class: [
      "px-4 py-2 flex",
      { "cursor-pointer hover:bg-slate-400/10": isClickable },
    ],
  };

  if (isLink) {
    return h(
      NuxtLink,
      {
        ...props,
        ...classes,
      },
      {
        default: defaultSlot,
      },
    );
  } else {
    return h("div", classes, {
      default: defaultSlot,
    });
  }
}

export default ListItem;
