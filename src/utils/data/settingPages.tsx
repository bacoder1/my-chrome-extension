import { Palette, Sparkles } from "lucide-react";
import { settingsPage } from "../../types/types";
import ColorSelector from "../../ui/settings/ColorSelector";
// import WidgetsConfig from "../../ui/settings/WidgetsConfig";
import IconSelector from "../../ui/settings/IconSelector";

const settingsPages: settingsPage[] = [
	{
		name: "Thème de couleur",
		color: "purple",
		category: "Personnalisation",
    icon: Palette,
		page: ColorSelector,
	},
	{
		name: "Icône du site",
		color: "goldenrod",
		category: "Personnalisation",
    icon: Sparkles,
		page: IconSelector,
	},
	// {
	// 	name: "Widgets",
	// 	color: "darkslateblue",
	// 	category: "Avancé",
  //   icon: LayoutTemplate,
	// 	page: WidgetsConfig,
	// },
];

export default settingsPages;