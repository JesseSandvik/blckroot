import { ChangeEventHandler, FocusEventHandler, LegacyRef } from "react";

type InputProps = {
  ariaDescribedBy?: string;
  ariaInvalid?: "false" | "true" | "grammar" | "spelling";
  autoComplete?: string;
  id?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
  value: string;
};

const Input = ({
  ariaDescribedBy,
  ariaInvalid,
  autoComplete,
  id,
  inputRef,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  type,
  value,
}: InputProps): JSX.Element => {
  return (
    <input
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      autoComplete={autoComplete}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      ref={inputRef}
      required={required}
      type={type}
      value={value}
    />
  );
};

export default Input;
