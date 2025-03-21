import React, { useState } from "react";
import settingsPages from "../utils/data/settingPages";
import { settingsPage } from "../utils/data/settingPages";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Heading, List, ListItem } from "./Components";

const Settings: React.FC = () => {
  const [selectedSetting, setSelectedSetting] = useState<settingsPage | null>(
    null,
  );

  let settingCategories: string[] = [];
  for (let setting of settingsPages) {
    if (!settingCategories.includes(setting.category))
      settingCategories.push(setting.category);
  }

  const SettingHeader: React.FC<{ setting: settingsPage }> = ({ setting }) => (
    <div
      className="top-0 mb-6 flex w-screen items-center justify-between bg-white px-5 py-2 font-semibold"
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
        color: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className="p-1.5">
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
    <div className="content relative">
      <motion.div className="absolute top-0 w-full select-none p-2 pt-14">
        <motion.div
          animate={{
            opacity: selectedSetting === null ? 0 : 0.5,
          }}
          className="pointer-events-none absolute inset-0 size-full h-screen bg-black"
        />
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
            initial={{ y: "100vh" }}
            animate={{ y: "0" }}
            exit={{ y: "100vh" }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="relative z-10 size-full bg-white"
          >
            <SettingHeader setting={selectedSetting} />
            <selectedSetting.page />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
