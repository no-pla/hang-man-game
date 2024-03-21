import React from "react";

const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-[592px] h-full w-full flex justify-center items-center">
      <div className="border rounded-[72px] w-full p-[52px] shadow-containerShadow from-bgGradientStart/75 to-bgGradientEnd/75 bg-gradient-to-b xs:p-8 xs:rounded-[48px]">
        {children}
      </div>
    </div>
  );
};

export default BoxContainer;
