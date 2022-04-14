import React from "react";

interface Props {
  name: string;
  type: string;
  icon: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

const FormInput: React.FC<Props> = ({
  name,
  icon,
  placeholder,
  type,
  minLength,
  maxLength,
}) => {
  return (
    <label htmlFor={name} className="relative w-full">
      <i
        className={icon + " absolute top-1/2 transform -translate-y-1/2 left-4"}
      ></i>

      <input
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full px-2 pl-11 py-3 bg-transparent rounded-md border border-blue-500"
        required={true}
      />
    </label>
  );
};

export default FormInput;
