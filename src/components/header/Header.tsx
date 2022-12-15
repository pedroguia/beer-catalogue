import { memo } from "react";

const Header = (): JSX.Element => (
  <div className="header" data-testid="header">
    <h1>Beer Catalogue</h1>
    <h3>Code Challenge</h3>
  </div>
);

export default memo(Header);
