import React, { ReactNode } from 'react';

interface CardWrapperProps {
  children: ReactNode;
  plain?: boolean;
}

export default function CardWrapper({ children, plain = null }: CardWrapperProps) {
  let className = 'w-full lg:w-4/12';
  if (!plain) className += ' flex flex-col min-h-[270px]  px-2 shadow-lg rounded p-2';

  return <div className={className}>{children}</div>;
}
