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
      firstIconType="x-mark"
      secondIconType="checkmark"
      toggleOn={toggleValidationIconsOn}
    />
  );
};

export default ToggleFormFieldValidationIcons;
