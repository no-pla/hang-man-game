import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-[592px] h-full w-full 3sm:w-[100%] flex justify-center items-center">
      <div className="border rounded-[72px] w-full p-[52px] shadow-containerShadow from-bgGradientStart/75 to-bgGradientEnd/75 bg-gradient-to-b 2sm:p-8 2sm:rounded-[48px]">
        {children}
      </div>
    </div>
  );
};

export default Container;
