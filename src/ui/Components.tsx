import { Check, ChevronRight, LucideIcon } from "lucide-react";
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
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
      className={`flex w-full select-none flex-col overflow-hidden rounded-xl ${className}`}
      style={{
        border: "1px solid rgba(0, 0, 0, 0.15)",
        boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface ListItemProps {
  title?: string;
  subtitle?: string;
  style?: React.CSSProperties;
  className?: string;
  icon: LucideIcon | string;
  color?: string;
  checkbox?: React.ReactNode;
  onClick?: () => void;
  index: number;
  iconSize?: number;
  chevron?: boolean;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
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
  chevron = true,
  trailing,
  children,
}: ListItemProps) => {
  return (
    <div
      className={`${className} flex items-center`}
      style={{
        borderTop: index !== 0 ? "1px solid rgba(0, 0, 0, 0.15)" : "",
        ...style,
      }}
      onClick={onClick}
    >
      {typeof Icon === "string" ? (
        <div
          style={{ backgroundColor: color }}
          className="m-2 mr-3 flex size-7 items-center justify-center rounded-lg"
        >
          <img src={Icon} height={iconSize} width={iconSize} />
        </div>
      ) : (
        <div
          style={{ backgroundColor: color }}
          className="m-2 mr-3 flex items-center justify-center rounded-lg p-1"
        >
          <Icon size={iconSize} color={color ? "#FFFFFF" : "#656565"} />
        </div>
      )}
      {children ? (
        children
      ) : (
        <p className="h-full flex-grow text-sm font-semibold">
          {title}
          {subtitle && (
            <>
              <br />
              <span>{subtitle}</span>
            </>
          )}
        </p>
      )}
      {onClick && chevron && (
        <ChevronRight size={20} color="#00000073" className="mr-2" />
      )}
      {CheckBoxElement}
      {trailing && trailing}
    </div>
  );
};

interface HeadingProps {
  title: string;
  trailing?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  trailing,
}: HeadingProps) => {
  return (
    <div className="mx-2 mb-[0.625rem] mt-6 flex select-none items-center justify-between text-sm font-semibold uppercase">
      <span className="text-black/45 opacity-40">{title}</span>
      {trailing && trailing}
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
      className={`flex size-6 cursor-pointer select-none items-center justify-center overflow-hidden rounded-full ${className}`}
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
      onClick={onClick}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            exit={{ scale: 0 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
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
      className={`${className} relative flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E9E9E9] text-[#656565] transition-colors ease-in-out hover:bg-[#DEDADA]`}
      style={style}
      onClick={onClick}
    >
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
      onClick={onClick}
    >
      <div className="tab-labels flex gap-2">
        {tabLabels.map((label) => {
          const isSelected = selectedTab === label.tabId;

          return (
            <div
              className={`tab-label relative cursor-pointer select-none rounded-lg px-2 py-1 text-sm font-semibold uppercase text-black/25 opacity-40 transition-colors delay-200 ease-out ${
                !isSelected ? "hover:bg-black/10" : "text-black/50"
              }`}
              id={`tab-label-${label.tabId}`}
              style={{ opacity: isSelected ? 1 : 0.3 }}
              onClick={() => setSelectedTab(label.tabId)}
            >
              {label.label}
              {/* <motion.div
								animate={{ opacity: isSelected ? 1 : 0 }}
								className="absolute w-full left-0 h-[1px] bottom-0 bg-black/45"
							/> */}
            </div>
          );
        })}
      </div>
      <div className="mb-4 h-[1px] w-full">
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
          className="tabs w-full"
          ref={tabRef}
        >
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
        } relative flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E9E9E9] font-semibold text-[#656565] transition-colors ease-in-out hover:bg-[#DEDADA]`}
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
        }}
      >
        {Icon && <Icon size={iconSize} />}
        {label}
        {loading ? <Spinner /> : null}
        {type === "image" ? (
          <input
            type="file"
            className="pointer-events-none fixed -top-full opacity-0"
            accept="image/png, image/jpeg"
            onChange={(event) => onChange && onChange(event)}
          />
        ) : null}
      </label>
      {caption && (
        <p className="mx-auto mt-3 text-center text-xs text-[#ACABA9]">
          ou Ctrl+V pour coller une image <br />
          ou déposez une image
        </p>
      )}
    </React.Fragment>
  );
};

interface TooltipProps {
  className?: string;
  style?: React.CSSProperties;
  tooltip: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  className = "",
  style,
  tooltip,
}: TooltipProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;

      if (parent) {
        const handleMouseOver = () => setHovering(true);
        const handleMouseOut = () => setHovering(false);

        parent.addEventListener("mouseover", handleMouseOver);
        parent.addEventListener("mouseout", handleMouseOut);

        return () => {
          parent.removeEventListener("mouseover", handleMouseOver);
          parent.removeEventListener("mouseout", handleMouseOut);
        };
      }
    }
  }, [ref]);

  return (
    <div
      className={`${className} ${
        hovering
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-2 scale-90 opacity-0"
      } absolute -top-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2 select-none rounded-md bg-black/80 px-2 py-1 text-xs text-white transition delay-500 duration-[200] ease-in-out`}
      ref={ref}
      style={{
        boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
        ...style,
      }}
    >
      {tooltip}
    </div>
  );
};

interface TextInputProps {
  style?: React.CSSProperties;
  placeholder?: string;
  initial?: string;
  icon?: LucideIcon;
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconSize?: number;
  id: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeholder = "",
  initial = "",
  icon: Icon,
  label,
  style,
  className,
  onChange,
  id,
  iconSize = 20,
}: TextInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.value = initial;
    }
  }, []);
  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        ...style,
      }}
    >
      {Icon && <Icon size={iconSize} className="m-2 mr-3" color="#656565" />}
      <div className="flex flex-col gap-2">
        <div className="text-black/60">{label}</div>
        <input
          type="text"
          name={id}
          id={id}
          ref={ref}
          placeholder={placeholder}
          onChange={(event) => onChange && onChange(event)}
        />
      </div>
    </div>
  );
};

interface SwitchProps {
  accentColor?: string;
  checked: boolean;
  onChange?: (event: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({
  accentColor,
  checked,
  className,
  onChange,
  style,
}: SwitchProps) => {
  const { themeColor } = useAppState();
  if (!accentColor) accentColor = `rgba(${themeColor.rgb.primary}, 1)`;

  return (
    <div
      className={`relative inline-flex h-[2.375rem] w-[3.625rem] cursor-pointer overflow-clip p-3 ${className}`}
    >
      <motion.div
        style={{ ...style }}
        className="absolute left-0 top-0 z-10 inline-flex rounded-full p-[0.5625rem] hover:bg-black/[0.04]"
        animate={{ x: checked ? 20 : 0, color: checked ? accentColor : "#fff" }}
      >
        <input
          type="checkbox"
          className="absolute -left-full z-10 h-full w-[300%] cursor-pointer opacity-0"
          onChange={(event) => onChange && onChange(event)}
        />
        <div
          style={{
            boxShadow: "0 1.5px 6px 0 rgba(0, 0, 0, 0.05)",
            border: !checked ? "1px solid rgba(0, 0, 0, 0.15)" : "",
          }}
          className="size-5 rounded-full bg-current"
        ></div>
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden"></div>
      </motion.div>
      <motion.div
        style={{ backgroundColor: accentColor }}
        animate={{
          opacity: checked ? 0.5 : 0.3,
          backgroundColor: checked ? accentColor : "black",
        }}
        className="-z-10 size-full rounded-full"
      />
    </div>
  );
};

interface InputProps {
  type: string;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = "", type = "text", style, className = "", onChange },
    ref,
  ) => {
    const { themeColor } = useAppState();

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`font-semibold ${className}`}
        onChange={(event) => onChange && onChange(event)}
        style={{ "--accent-color": `rgba(${themeColor.rgb.lighter}, 1)`, ...style } as React.CSSProperties}
      />
    );
  },
);
