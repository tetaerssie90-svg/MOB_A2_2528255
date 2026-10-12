import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import {
  AcademicCapIcon as AcademicCapSolid,
  BriefcaseIcon as BriefcaseSolid,
  HomeIcon as HomeSolid,
  InformationCircleIcon as InformationCircleSolid,
  PencilSquareIcon as PencilSquareSolid,
} from "react-native-heroicons/solid";

export type HeroIcon = ComponentType<SvgProps & { size?: number }>;

/** Heroicons v2 (24 outline / solid) — the same set used in Vitaway EHR */
export const tabs = {
  index: { label: "Home", icon: HomeIcon, activeIcon: HomeSolid },
  skills: { label: "About me", icon: AcademicCapIcon, activeIcon: AcademicCapSolid },
  projects: { label: "Work", icon: BriefcaseIcon, activeIcon: BriefcaseSolid },
  profile: { label: "Edit", icon: PencilSquareIcon, activeIcon: PencilSquareSolid },
  about: { label: "Info", icon: InformationCircleIcon, activeIcon: InformationCircleSolid },
} as const satisfies Record<string, { label: string; icon: HeroIcon; activeIcon: HeroIcon }>;

export type TabKey = keyof typeof tabs;
