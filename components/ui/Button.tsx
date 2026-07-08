/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
};

type ButtonElementProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = ButtonLinkProps | ButtonElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary:
    "border border-blue-200 bg-white text-blue-900 hover:border-blue-400 hover:bg-blue-50",
  ghost: "text-blue-700 hover:text-blue-900",
  danger: "text-red-600 hover:text-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3",
};

function getButtonClasses({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  className: string;
}) {
  return [
    "inline-flex items-center justify-center rounded-full font-semibold transition disabled:cursor-not-allowed disabled:bg-blue-300",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
  } = props;

  const classes = getButtonClasses({
    variant,
    size,
    fullWidth,
    className,
  });

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _variant,
    size: _size,
    fullWidth: _fullWidth,
    className: _className,
    ...buttonProps
  } = props;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
