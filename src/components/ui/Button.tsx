import { clsx } from "clsx";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";

type ButtonBaseProps = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-[#F2946B] text-white shadow-[0_2px_16px_rgba(237,102,83,0.3)] hover:shadow-[0_4px_24px_rgba(237,102,83,0.4)] hover:brightness-105 active:brightness-95",
  secondary:
    "border-2 border-accent/30 text-accent hover:border-accent hover:bg-accent-light active:bg-accent-mid",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-black/[0.03] active:bg-black/[0.06]",
  white:
    "bg-white text-text-primary shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:bg-white/90 active:bg-white/80",
};

const sizeStyles = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm font-semibold",
  lg: "px-9 py-4 text-base font-semibold",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsAnchor;
    return <a href={href} className={classes} {...anchorProps} />;
  }

  return <button className={classes} {...(rest as ButtonAsButton)} />;
}
