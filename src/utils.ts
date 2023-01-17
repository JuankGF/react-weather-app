import { ICON_MAP } from "./icons/iconMap";

const getIconUrl = (iconCode?: number) => {
  return `src/icons/${ICON_MAP.get(iconCode ?? 2)}.svg`;
};

const DAY_Formatter = new Intl.DateTimeFormat(undefined, { weekday: "long" });

const HOUR_Formatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
});

export { DAY_Formatter, HOUR_Formatter, getIconUrl };
