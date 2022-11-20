import { memo } from "react";

const NotFound = () => (
  <div className="not-found">
    <div className="title">404</div>
    <div className="subtitle">This page does not exist!</div>
  </div>
);

export default memo(NotFound);
