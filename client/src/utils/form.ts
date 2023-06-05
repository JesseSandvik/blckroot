export const handleGenericOnChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
): void => {
  event.preventDefault();
  setState(event.currentTarget.value);
};
