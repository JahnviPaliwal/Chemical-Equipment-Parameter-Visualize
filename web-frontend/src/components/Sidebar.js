import React, { useState } from "react";

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: isOpen ? "300px" : "40px",
        background: "rgba(255, 147, 0, 0.46)",
        borderLeft: "1px solid #ccc",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        transition: "width 0.3s",
        overflow: "hidden",
        zIndex: 1000,
        paddingTop: "10px",
      }}
    >

      {/* Sidebar content */}
      <div style={{ padding: "20px" }}>{isOpen && children}</div>
    </div>
  );
}

export default Sidebar;
