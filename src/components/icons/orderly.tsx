import { FC } from "react";
import Image from "next/image";

export interface IconProps {
  size: number;
  className?: string;
}

export const OrderlyIcon: FC<IconProps> = (props) => {
  const { size = 14, className = "" } = props;
  return (
    <Image
      src="/images/keklogo2.png"
      alt="KEK Terminal"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
};

export const OrderlyActiveIcon: FC<IconProps> = (props) => {
  const { size = 14, className = "" } = props;
  return (
    <Image
      src="/images/keklogo2.png"
      alt="KEK Terminal Active"
      width={size}
      height={size}
      className={`object-contain opacity-100 ${className}`}
    />
  );
};
