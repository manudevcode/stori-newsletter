import React from "react";

type InputProps = {
  id: string;
  type: string;
  value: any;
  placeHolder: string;
  onChange: React.ChangeEventHandler;
  onBlur?: React.ChangeEventHandler;
  error?: boolean;
  className?: string;
  disabled?: boolean;
  step?: string;
};

export const Input = (props: InputProps) => {
  const {
    id,
    value,
    type,
    placeHolder,
    onChange,
    onBlur,
    error = false,
    className = "w-full mx-0 my-2 py-2",
    disabled = false,
    ...rest
  } = props;
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`input disabled:cursor-no-drop ${
        error ? "error" : ""
      } ${className}`}
      placeholder={placeHolder}
      onBlur={onBlur}
      disabled={disabled}
      {...rest}
    />
  );
};
