import { memo } from "react";

interface Props {
  abv: number;
  firstBrewed: string;
  id: string;
  imageUrl: string;
  name: string;
  onClick(id: string): void;
}

const Card = ({ abv, firstBrewed, id, imageUrl, name, onClick }: Props): JSX.Element => {
  const showImage: boolean = !id.startsWith("n-");

  const handleClickCard = (): void => {
    onClick(id);
  };

  return (
    <article className="card" onClick={handleClickCard} title={name} data-testid="card">
      <div className="card__circle" />
      {showImage && <img className="card__image" key={id} src={imageUrl} alt={name} />}
      <div className="card__info">
        <h3 className="ellipsis">{name}</h3>
        <p>First brewed in {firstBrewed}</p>
        <p>ABV: {abv}%</p>
      </div>
    </article>
  );
};

export default memo(Card);
