import React from "react";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="copyright">@Copyright 2022 All rights reserved</div>
      <div className="custom--children">{props.children}</div>
    </div>
  );
}
