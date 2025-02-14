import { Trash2 } from "lucide-react";
import { useAppState } from "../../context/StateContext";

interface ResetButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  tooltip?: string;
}

const ResetButton: React.FC<ResetButtonProps> = ({
  color,
  tooltip = "Réinitialiser",
  onClick,
}: ResetButtonProps) => {
  if (!color) color = `rgba(${useAppState().themeColor.rgb.primary}, 0.5)`;

  return (
    <div
      className="tab-label relative cursor-pointer select-none text-ellipsis rounded-md p-[0.375rem] transition-colors delay-[50ms] ease-out hover:bg-black/[0.05]"
      style={{ color }}
      onClick={onClick}
      title={tooltip}
    >
      <Trash2 size={20} />
    </div>
  );
};

export default ResetButton;
