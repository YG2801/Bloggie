import React from 'react';

export default function Button({
  children,
  type = 'button',
  bgColor = 'bg-light-purple',
  hoverBgColor = 'hover:bg-dark-purple',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 shadow-md transition-colors ${hoverBgColor} ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
