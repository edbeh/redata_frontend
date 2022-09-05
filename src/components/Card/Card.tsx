import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full p-6 bg-white shadow-lg rounded-xl">
      {children}
    </div>
  );
};

export default Card;
