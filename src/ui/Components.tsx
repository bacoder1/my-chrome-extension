import { Check, LucideIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColorListItemProps, useAppState } from "../context/StateContext";
import { AnimatePresence, motion } from "motion/react";
import Spinner from "./Spinner";

interface ListProps {
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
	onClick?: (event: any) => void;
}

export const List: React.FC<ListProps> = ({
	style,
	className = "",
	children,
	onClick,
}: ListProps) => {
	return (
		<div
			className={`rounded-xl select-none overflow-hidden flex flex-col w-full ${className}`}
			style={{
				border: "1px solid rgba(0, 0, 0, 0.15)",
				boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
				...style,
			}}
			onClick={onClick}>
			{children}
		</div>
	);
};

interface ListItemProps {
	title: string;
	subtitle?: string;
	style?: React.CSSProperties;
	className?: string;
	icon: LucideIcon | string;
	color?: string;
	checkbox?: React.ReactNode;
	onClick?: () => void;
	index: number;
	iconSize?: number;
}

export const ListItem: React.FC<ListItemProps> = ({
	title,
	subtitle,
	style,
	className = "",
	icon: Icon,
	iconSize = 20,
	color,
	checkbox: CheckBoxElement,
	onClick,
	index,
}: ListItemProps) => {
	return (
		<div
			className={`${className} flex items-center`}
			style={{
				borderTop: index !== 0 ? "1px solid rgba(0, 0, 0, 0.15)" : "",
				...style,
			}}
			onClick={onClick}>
			{typeof Icon === "string" ? (
				<div
					style={{ backgroundColor: color }}
					className="m-2 mr-3 flex justify-center items-center size-7 rounded-lg">
					<img src={Icon} height={iconSize} width={iconSize} />
				</div>
			) : (
				<div
					style={{ backgroundColor: color }}
					className="m-2 mr-3 flex justify-center items-center p-1 rounded-lg">
					<Icon size={iconSize} color={"#FFFFFF"} />
				</div>
			)}
			<p className="font-semibold flex-grow h-full">
				{title}
				{subtitle && (
					<>
						<br />
						<span>{subtitle}</span>
					</>
				)}
			</p>
			{CheckBoxElement}
		</div>
	);
};

interface ListHeaderProps {
	title: string;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
	title,
}: ListHeaderProps) => {
	return (
		<div className="font-semibold select-none ml-2 opacity-40 text-black/45 text-sm uppercase mt-6 mb-[0.625rem]">
			{title}
		</div>
	);
};

interface CheckboxProps {
	checked: boolean;
	className?: string;
	style?: React.CSSProperties;
	color?: string | ColorListItemProps;
	onClick?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	className = "",
	style,
	color,
	onClick,
}: CheckboxProps) => {
	const { themeColor } = useAppState();
	if (!color) color = themeColor;

	return (
		<motion.div
			style={{
				outline: "4px solid transparent",
				border: !checked ? "1px solid rgba(0, 0, 0, 0.15)" : "none",
				backgroundColor: checked ? `rgba(${themeColor.rgb.primary}, 1)` : "",
				...style,
			}}
			className={`size-6 flex justify-center items-center cursor-pointer select-none rounded-full overflow-hidden ${className}`}
			whileHover={{
				outlineColor: checked ? "rgba(0, 0, 0, 0.1)" : "transparent",
				backgroundColor: !checked
					? "rgba(0, 0, 0, 0.1)"
					: `rgba(${themeColor.rgb.primary}, 1)`,
			}}
			whileTap={{ scale: 0.9 }}
			animate={{
				backgroundColor: checked ? `rgba(${themeColor.rgb.primary}, 1)` : "",
			}}
			onClick={onClick}>
			<AnimatePresence>
				{checked && (
					<motion.div
						exit={{ scale: 0 }}
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}>
						<Check size={14} strokeWidth={3.5} color="#fff" />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

interface ModalButtonProps {
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
	icon?: LucideIcon;
	label: string;
	iconSize?: number;
	modal?: React.ReactNode | (() => React.ReactElement) | React.ReactElement;
	modalOpened?: boolean;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
	style,
	className = "",
	onClick,
	icon: Icon,
	label,
	iconSize = 20,
	modal: _Modal,
}: ModalButtonProps) => {
	return (
		<div
			className={`${className} flex relative bg-[#E9E9E9] justify-center transition-colors ease-in-out hover:bg-[#DEDADA] rounded-lg h-9 cursor-pointer text-[#656565] gap-2 items-center`}
			style={style}
			onClick={onClick}>
			{Icon && <Icon size={iconSize} />}
			<p className="font-semibold">{label}</p>
			{/* {Modal && (
				<motion.div
					animate={{ y: modalOpened ? 0 : -10, opacity: modalOpened ? 1 : 0 }}
					className="absolute top-full w-full left-0">
					{typeof Modal === "function" ? Modal() : Modal}
				</motion.div>
			)} */}
		</div>
	);
};

interface Tab {
	id: string;
	content: React.ReactNode;
}

interface TabLabel {
	label: string;
	tabId: string;
}

interface TabsProps {
	tabs: Tab[];
	tabLabels: TabLabel[];
	defaultTab?: string;
	onClick?: () => void;
	className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
	tabs,
	tabLabels,
	defaultTab = tabLabels[0].tabId,
	onClick,
	className = "",
}: TabsProps) => {
	const [selectedTab, setSelectedTab] = useState(defaultTab);
	const [labelSizes, setLabelSizes] = useState<{
		[key: string]: { labelWidth: number; labelLeft: number };
	}>({});
	const tabRef = useRef(null);

	const activeTab = tabs.find((tab) => tab.id === selectedTab);

	useEffect(() => {
		const sizes: {
			[key: string]: { labelWidth: number; labelLeft: number };
		} = {};

		const parent = document.querySelector(".tab-labels");
		if (!parent || !(parent instanceof HTMLElement)) return;

		document.querySelectorAll(".tab-label").forEach((label) => {
			const tab = label.id.replace("tab-label-", "");

			if (label instanceof HTMLElement) {
				const labelWidth = label.offsetWidth;
				const labelLeft = label.offsetLeft - parent.offsetLeft;

				sizes[tab] = { labelWidth, labelLeft };
			}
		});

		setLabelSizes(sizes);
		console.log(sizes);
	}, [tabs, selectedTab]);

	return (
		<motion.div
			layout
			className={`flex flex-col ${className}`}
			onClick={onClick}>
			<div className="flex gap-2 tab-labels">
				{tabLabels.map((label) => {
					const isSelected = selectedTab === label.tabId;

					return (
						<div
							className={`font-semibold tab-label select-none relative cursor-pointer rounded-lg delay-200 transition-colors ease-out px-2 py-1 opacity-40 text-black/25 text-sm uppercase ${!isSelected ? "hover:bg-black/10" : "text-black/50"}`}
							id={`tab-label-${label.tabId}`}
							style={{ opacity: isSelected ? 1 : 0.3 }}
							onClick={() => setSelectedTab(label.tabId)}>
							{label.label}
							{/* <motion.div
								animate={{ opacity: isSelected ? 1 : 0 }}
								className="absolute w-full left-0 h-[1px] bottom-0 bg-black/45"
							/> */}
						</div>
					);
				})}
			</div>
			<div className="h-[1px] mb-4 w-full">
				<motion.div
					className="h-full bg-black/65"
					animate={{
						x: labelSizes[selectedTab]?.labelLeft || 0,
						width: labelSizes[selectedTab]?.labelWidth || 0,
					}}
				/>
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					key={selectedTab}
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 10, opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="w-full tabs"
					ref={tabRef}>
					{activeTab && activeTab.content}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};

interface FileInputProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	icon: LucideIcon;
	label: string;
	iconSize?: number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	type: string;
	onDrop?: (event: any) => void;
	caption?: boolean;
	loading?: boolean;
}

export const FileInput: React.FC<FileInputProps> = ({
	className = "",
	style,
	onClick,
	icon: Icon,
	iconSize = 20,
	label,
	onChange,
	type,
	onDrop,
	caption = true,
	loading = false,
}: FileInputProps) => {
	const [isHovering, setisHovering] = useState<boolean>(false);

	return (
		<React.Fragment>
			<label
				className={`${className} ${
					isHovering ? "!bg-[#cddbe8]" : ""
				} flex relative font-semibold bg-[#E9E9E9] justify-center transition-colors ease-in-out hover:bg-[#DEDADA] rounded-lg h-9 cursor-pointer text-[#656565] gap-2 items-center`}
				style={style}
				onClick={onClick}
				onDrop={onDrop}
				onDragEnter={() => {
					setisHovering(true);
					console.log("hi");
				}}
				onDragOver={(event: any) => {
					event.preventDefault();
				}}
				onDragLeave={() => {
					setisHovering(false);
				}}>
				{Icon && <Icon size={iconSize} />}
				{label}
				{loading ? <Spinner /> : null}
				{type === "image" ? (
					<input
						type="file"
						className="fixed -top-full pointer-events-none opacity-0"
						accept="image/png, image/jpeg"
						onChange={(event) => onChange && onChange(event)}
					/>
				) : null}
			</label>
			{caption && (
				<p className="mt-3 text-[#ACABA9] text-center mx-auto text-xs">
					ou Ctrl+V pour coller une image <br />
					ou déposez une image
				</p>
			)}
		</React.Fragment>
	);
};
