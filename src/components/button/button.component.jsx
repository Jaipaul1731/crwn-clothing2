// button.component.jsx
import React from "react";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({
  children,
  buttonType, // e.g. "google" or "inverted"
  onClick, // explicit click handler
  type = "button", // default so it never submits a form
  ...otherProps
}) => {
  const variantClass = BUTTON_TYPE_CLASSES[buttonType] || "";

  return (
    <button
      type={type} // always present
      className={`button-container ${variantClass}`}
      onClick={onClick} // now won’t get lost
      {...otherProps} // any extra props (e.g. disabled)
    >
      {children}
    </button>
  );
};

export default Button;
