import type { Availability } from "../types";
import { colors } from "../design-system/colors";

export const availabilityOptions: {
  value: Availability;
  label: string;
  color: string;
  background: string;
}[] = [
  { value: "internship", label: "Open to internships", color: colors.success, background: colors.successSoft },
  { value: "open", label: "Open to opportunities", color: colors.primary, background: colors.primarySoft },
  { value: "busy", label: "Not available right now", color: colors.warning, background: colors.warningSoft },
];

export function availabilityMeta(value: Availability) {
  return availabilityOptions.find((o) => o.value === value) ?? availabilityOptions[0];
}
