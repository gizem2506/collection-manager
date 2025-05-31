// Bu bileşen, farklı stil varyantlarına sahip yeniden kullanılabilir bir düğme bileşenidir.
import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded-lg font-semibold transition  0 h-10 px-4",
        fullWidth && "w-full",
        variant === "primary" &&
          "bg-black text-white border border-black hover:bg-white hover:text-black ",
        variant === "secondary" &&
          "bg-white text-blue-600 border-2 border-blue-600 ",
        variant === "outline" &&
          "bg-white text-gray-700 border border-gray-300 ",
        props.disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 