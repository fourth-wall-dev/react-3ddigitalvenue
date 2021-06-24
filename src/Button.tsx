import { MouseEventHandler } from "react";
import "./styles.css";

export interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler;
  children?: React.ReactChild;
}

export function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={["icon-btn", className].join(" ")}
    >
      {children}
    </button>
  );
}
