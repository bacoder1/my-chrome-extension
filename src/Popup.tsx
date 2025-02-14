import React from "react";
import Settings from "./ui/Settings";
import Header from "./ui/Header";

const Popup: React.FC = () => (
  <div className="relative flex min-h-[26rem] w-[21rem] flex-col overflow-hidden">
    <Header />
    <Settings />
  </div>
);

export default Popup;
