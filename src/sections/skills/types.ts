import type { ElementType } from "react";
import type { IconType } from "react-icons";

export type CategoryKey = "frontend" | "backend" | "database" | "tools";
export type FilterCategory = "all" | CategoryKey;

export interface SkillMeta {
  name: string;
  category: CategoryKey;
  icons: Array<{ icon: IconType | ElementType; color: string }>;
  brandColor: string;
  tag: string;
}
