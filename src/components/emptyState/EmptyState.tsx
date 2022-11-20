import { memo } from "react";

interface Props {
  subtitle?: string;
  title: string;
}

const EmptyState = ({ subtitle, title }: Props): JSX.Element => (
  <div className="empty-state" data-testid="empty-state">
    <p>{title}</p>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

export default memo(EmptyState);
