import { memo } from "react";

interface Props {
  body: JSX.Element;
  footer: JSX.Element;
  title: string;
}

const Modal = ({ body, footer, title }: Props): JSX.Element => (
  <div className="backdrop">
    <div className="modal" data-testid="modal">
      <div className="modal__header">
        <h2 className="title">{title}</h2>
      </div>
      <div className="modal__body">{body}</div>
      <div className="modal__footer">{footer}</div>
    </div>
  </div>
);

export default memo(Modal);
