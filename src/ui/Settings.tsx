import React, { useState } from "react";
import settingsPages from "../utils/data/settingPages";
import { settingsPage } from "../utils/data/settingPages";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Heading, List, ListItem } from "./Components";

const Settings: React.FC = () => {
	const [selectedSetting, setSelectedSetting] = useState<settingsPage | null>(
		null
	);

	let settingCategories: string[] = [];
	for (let setting of settingsPages) {
		if (!settingCategories.includes(setting.category))
			settingCategories.push(setting.category);
	}

	const SettingHeader: React.FC<{ setting: settingsPage }> = ({ setting }) => (
		<div
			className="bg-white top-0 mb-6 w-screen flex justify-between items-center font-semibold px-6 py-3"
			style={{
				borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
				boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
				color: "rgba(0, 0, 0, 0.8)",
			}}>
			<div className="flex gap-4 items-center">
				<div className="p-1">
					<ArrowLeft
						size={20}
						className="cursor-pointer"
						onClick={() => setSelectedSetting(null)}
					/>
				</div>
				<p className="text-base">{setting.name}</p>
			</div>
			{setting.headerTrailing}
		</div>
	);

	return (
		<div className="relative">
			<motion.div
				className="absolute pt-14 select-none top-0 p-2 w-full"
				animate={{
					x: selectedSetting === null ? "0" : "-100vw",
					opacity: selectedSetting === null ? 1 : 0,
				}}>
				{settingCategories.map((category) => (
					<React.Fragment key={category}>
						<Heading title={category} />
						<List>
							{settingsPages
								.filter((setting) => setting.category === category)
								.map((setting, index) => (
									<ListItem
										title={setting.name}
										icon={setting.icon}
										color={setting.color}
										index={index}
										className="cursor-pointer"
										onClick={() => setSelectedSetting(setting)}
									/>
								))}
						</List>
					</React.Fragment>
				))}
			</motion.div>
			<AnimatePresence>
				{selectedSetting !== null && (
					<motion.div
						initial={{ x: "100vw" }}
						animate={{ x: "0" }}
						exit={{ x: "100vw" }}
						className="relative size-full">
						<SettingHeader setting={selectedSetting} />
						<selectedSetting.page />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Settings;
