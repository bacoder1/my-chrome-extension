import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface DrawerProps {
  children: React.ReactNode;
  state: any[];
  onDismiss?: () => void,
}

const Drawer: React.FC<DrawerProps> = ({ children, state, onDismiss }: DrawerProps) => {
  const [opened, setOpened] = state;
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerHeight, setDrawerHeight] = useState(0);
  let mouseDownInside = false;

  useEffect(() => {
    if (drawerRef.current) {
      setDrawerHeight(drawerRef.current.offsetHeight);
    }
  }, [drawerRef.current]);

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          role="dialog"
          className="fixed inset-0 z-[999] flex size-full flex-col justify-end"
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          onClick={(event) => {
            if (
              !mouseDownInside &&
              drawerRef.current &&
              !drawerRef.current.contains(event.target as Node)
            ) {
              setOpened(null);
              onDismiss && onDismiss();
            }
          }}
          onPointerDown={(event) => {
            mouseDownInside =
              drawerRef.current?.contains(event.target as Node) || false;
          }}
        >
          <motion.div
            drag="y"
            className="w-full rounded-t-[10px] bg-white"
            dragConstraints={{ top: 0 }}
            animate={{
              y: 0,
              transition: {
                y: { type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] },
              },
            }}
            dragTransition={{
              min: 0,
              max: drawerHeight,
              modifyTarget: (target) => {
                if (target > drawerHeight * 0.6) {
                  setOpened(null)
                  onDismiss && onDismiss();
                }
                return target > drawerHeight * 0.6 ? drawerHeight : 0;
              },
              timeConstant: 75,
            }}
            dragElastic={0}
            initial={{ y: "100%" }}
            exit={{ y: "100%" }}
            ref={drawerRef}
          >
            <div className="mx-auto my-3 h-[6px] w-[100px] rounded-full bg-slate-100"></div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
