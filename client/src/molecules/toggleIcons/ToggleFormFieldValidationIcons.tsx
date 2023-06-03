import ToggleIcons from "./ToggleIcons";

type ToggleFormFieldValidationIconsPropTypes = {
  toggleValidationIconsOn: boolean;
};

const ToggleFormFieldValidationIcons = ({
  toggleValidationIconsOn,
}: ToggleFormFieldValidationIconsPropTypes) => {
  return (
    <ToggleIcons
      id="form-field-validation-icon"
      firstIconClassName="alert"
      firstIconType="x-mark"
      secondIconClassName="success"
      secondIconType="checkmark"
      toggleOn={toggleValidationIconsOn}
    />
  );
};

export default ToggleFormFieldValidationIcons;
