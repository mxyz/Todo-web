import { useCallback, useState } from "react";
import "./Dropdown.scss";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface IPropsDropdown {
  options: Option[];
  selectedOptionValue: string;
  onChange: (selectedValue: string) => void;
}

const Dropdown = (props: IPropsDropdown) => {
  const { options, onChange, selectedOptionValue } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = useCallback(
    (value: string) => {
      onChange(value);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOptionValue}
        <FaAngleDown />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
