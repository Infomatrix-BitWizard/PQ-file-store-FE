import "./Footer.css";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="bottom-navigation">
        <div className="content">
          <span style={{width: '100%', textAlign: 'center'}}>© 2025 Quantum Information Science. All rights reserved.</span>
        </div>
      </div>
    </>
  )
}

export default Footer;
