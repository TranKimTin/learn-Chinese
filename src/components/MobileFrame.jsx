import React from "react";

export const MobileFrame = ({ children }) => {
  return (
    <div className="app-container">
      <div className="phone-frame">
        <div className="phone-content">{children}</div>
      </div>
    </div>
  );
};
