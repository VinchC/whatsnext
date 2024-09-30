import Link from "next/link";

export function LpCard({
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
        <img className="lp-card-image" src="/images/black_moon_stage.jpg" />
        <div className="lp-card-text">
          <Link href={`lps/${id}`} className="lp-card-title">
            {title}
          </Link>
          <div className="lp-card-price">{price}</div>
        </div>
      </div>
    </>
  );
}
