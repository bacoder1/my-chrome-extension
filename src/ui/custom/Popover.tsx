import { useEffect, useRef, useState } from "react";

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {}

const Popover: React.FC<PopoverProps> = ({
  children,
  style,
  className,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const parent = popoverRef.current?.parentElement;
  
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
        console.log("Clicked outside");
      }
      console.log(event.target)
    };
  
    const handleParentClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        popoverRef.current.contains(event.target as Node)
      ) {
        // Clicked inside the popover; ignore parent click logic
        return;
      }
      
      event.stopPropagation(); // Prevent the click from bubbling to `window`
      setIsActive((prev) => !prev);
      console.log("Clicked parent", parent);
    };
  
    // Add event listeners
    parent?.addEventListener("click", handleParentClick);
    window.addEventListener("click", handleClickOutside);
  
    // Cleanup listeners on unmount
    return () => {
      parent?.removeEventListener("click", handleParentClick);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);  

  return (
    <div
      className={`absolute bottom-full left-0 z-[999] overflow-hidden rounded-[10px] bg-white transition-opacity duration-200 ${isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${className}`}
      ref={popoverRef}
      style={{
        boxShadow:
          "rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Popover;
