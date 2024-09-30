import React from 'react';
import { useId } from 'react';

export default React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 inline-block">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black shadow-md outline-none duration-200 focus:bg-gray-50 ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});
