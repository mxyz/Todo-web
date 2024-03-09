import { MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

interface IPropsButton {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IPropsButton) => {
  const { children, onClick } = props;
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
