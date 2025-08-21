import React from "react";

interface Props {
  className?: string;
}

export const RightSide: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="w-[300px] h-[400px] bg-secondary rounded-lg "></div>
    </div>
  );
};
