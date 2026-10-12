export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

/** Leaves room under scroll content for the floating tab dock */
export const TAB_DOCK_CLEARANCE = 120;

/** Minimum touch target recommended by Android accessibility guidelines */
export const MIN_TOUCH = 48;
