import {
  ChartArea,
  LucideIcon,
  Minus,
  Palette,
  Sparkles,
  SwatchBook,
  User,
} from "lucide-react";
import ColorSelector from "../../ui/settings/ColorSettings";
// import WidgetsSettings from "../../ui/settings/WidgetsSettings";
import IconSettings from "../../ui/settings/IconSettings";
import ProfileSettings from "../../ui/settings/ProfileSettings";
import SubjectsSettings from "../../ui/settings/SubjectsSettings";
import ResetButton from "../../ui/custom/ResetButton";
import GradesSettings from "../../ui/settings/GradesSettings";
import { Menu } from "../../ui/Components";

export interface settingsPage {
  name: string;
  color: string;
  category: string;
  icon: LucideIcon;
  page: React.FC<{}>;
  headerTrailing?: React.ReactElement;
}

const settingsPages: settingsPage[] = [
  {
    name: "Profil",
    color: "crimson",
    category: "Général",
    icon: User,
    page: ProfileSettings,
  },
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
    page: IconSettings,
  },
  {
    name: "Matières",
    color: "forestgreen",
    category: "Personnalisation",
    icon: SwatchBook,
    page: SubjectsSettings,
    headerTrailing: (
      <ResetButton
        onClick={() => {
          chrome.storage.sync.set({ subjectData: {} });
        }}
      />
    ),
  },
  {
    name: "Notes",
    color: "peru",
    category: "Avancé",
    icon: ChartArea,
    page: GradesSettings,
    headerTrailing: (
      <Menu
        onSelect={(button) => {
          console.log("button", button);
          if (button.id === "single") {
            chrome.storage.sync.set({ chartDualLineMode: false });
          } else if (button.id === "double") {
            chrome.storage.sync.set({ chartDualLineMode: true });
          }
        }}
        buttons={[
          { label: "Vue unique", id: "single", icon: Minus },
          { label: "Vue multiple", id: "double", icon: Minus },
        ]}
        selectedId={async () => {
          const result = await chrome.storage.sync.get("chartDualLineMode");
          return result.chartDualLineMode ? "double" : "single";
        }}
      />
    ),
  },
  // {
  // 	name: "Widgets",
  // 	color: "darkslateblue",
  // 	category: "Avancé",
  //   icon: LayoutTemplate,
  // 	page: WidgetsSettings,
  // },
];

export default settingsPages;
