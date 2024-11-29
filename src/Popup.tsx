import React from "react";
import Settings from "./ui/Settings";
import Header from "./ui/Header";

const Popup: React.FC = () => (
	<div className="w-[21rem] min-h-[21rem] flex flex-col relative overflow-hidden">
		<Header />
		<Settings />
	</div>
);

export default Popup;
