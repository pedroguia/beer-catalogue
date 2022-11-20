import { memo } from "react";

interface Props {
  color?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  label: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const Button = ({ color = "primary", disabled = false, label, onClick }: Props): JSX.Element => (
  <button type="button" className={`btn btn-${color}`} onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

export default memo(Button);
