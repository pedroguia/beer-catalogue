import { memo } from "react";

interface Props {
  dataTestId?: string;
  label?: string;
  max?: number;
  min?: number;
  name?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  type?: "text" | "number";
  value: string;
}

const TextField = ({
  dataTestId = "text-field",
  label,
  max,
  min,
  name,
  onChange,
  placeholder = "",
  type = "text",
  value,
}: Props): JSX.Element => (
  <div className="text-field" data-testid={dataTestId}>
    {label && <label className="text-field__label">{label}</label>}
    <input
      className="text-field__input"
      aria-label="text-input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      max={max}
      min={min}
    />
  </div>
);

export default memo(TextField);
