import { LucideIcon } from "lucide-react";
import React from "react";

export interface settingsPage {
	name: string;
	color: string;
	category: string;
  icon: LucideIcon;
	page: React.FC<{}>;
}
