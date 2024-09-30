import Link from "next/link";

export default function LpCard({
  id,
  title,
  price,
}: {
  id: number;
  title: string;
  price: number;
}) {
  return (
    <>
      <div className="lp-card-container">
        <Link className="lp-card-title" href={`/lps/${id}`}>
          <img className="lp-card-image" src={`/images/${id}.webp`} />
          <div className="lp-card-text">
            <div className="lp-card-title">{title}</div>
            <div className="lp-card-price">{price}</div>
          </div>
        </Link>
      </div>
    </>
  );
}
