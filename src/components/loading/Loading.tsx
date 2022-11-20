import { memo } from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = (): JSX.Element => (
  <div className="loading-container" data-testid="loading-container">
    <ThreeDots color="#8a8a8a" height={75} width={75} />
  </div>
);

export default memo(Loading);
