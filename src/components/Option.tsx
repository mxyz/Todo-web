import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaEllipsisH } from "react-icons/fa";
import "./Option.scss";

interface IPropsOption {
  onEdit?: () => void;
  onDelete?: () => void;
}

const Option = (props: IPropsOption) => {
  const { onEdit, onDelete } = props;
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit();
    }
    setIsActive(false); // Close the menu after action
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete();
    }
    setIsActive(false); // Close the menu after action
  }, [onDelete]);

  return (
    <div className={`option-container ${isActive ? "active" : ""}`} ref={ref}>
      <div className="option-icon" onClick={toggleMenu}>
        <FaEllipsisH color="#9796A8" />
      </div>
      <div className={`option-menu ${isActive ? "active" : ""}`}>
        {onEdit && <div onClick={handleEdit}>Edit</div>}
        {onDelete && (
          <div className="delete-button" onClick={handleDelete}>
            Delete
          </div>
        )}
      </div>
    </div>
  );
};

export default Option;
