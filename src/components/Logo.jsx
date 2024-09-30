import React from 'react';
import { FaFeatherAlt } from 'react-icons/fa';

export default function Logo() {
  return (
    <div
      className={`text-very-dark-purple flex select-none items-center gap-2 text-4xl`}
    >
      <FaFeatherAlt />
      <p className="font-Arthemis font-semibold">Bloggie</p>
    </div>
  );
}
