import { useCallback } from "react";
import "./Checkbox.scss";

interface IPropsCheckbox {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox = (props: IPropsCheckbox) => {
  const { checked, onChange } = props;
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange]
  );

  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={handleChange} />
    </div>
  );
};

export default Checkbox;
