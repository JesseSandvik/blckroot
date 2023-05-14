import {
  ChangeEventHandler,
  FocusEventHandler,
  LegacyRef,
  ReactNode,
} from "react";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";

type LabeledInputProps = {
  ariaDescribedBy?: string;
  ariaInvalid?: "false" | "true" | "grammar" | "spelling";
  autoComplete?: string;
  inputId: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  label: ReactNode;
  className?: string;
  name: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
  value: string;
};

const LabeledInput = ({
  ariaDescribedBy,
  ariaInvalid,
  autoComplete,
  className,
  inputId,
  inputRef,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  type,
  value,
}: LabeledInputProps): JSX.Element => {
  return (
    <Label className={className} htmlFor={inputId}>
      {label}
      <Input
        ariaDescribedBy={ariaDescribedBy}
        ariaInvalid={ariaInvalid}
        autoComplete={autoComplete}
        id={inputId}
        inputRef={inputRef}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        type={type}
        value={value}
      />
    </Label>
  );
};

export default LabeledInput;
