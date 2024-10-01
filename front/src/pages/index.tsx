import LpCard from "@/components/LpCard/LpCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";

const LPS = [
  {
    id: 1,
    title: "Black Moon - Enta Da Stage",
    price: 10,
  },
  {
    id: 2,
    title: "Dr Dre - The Chronic",
    price: 20,
  },
  {
    id: 3,
    title: "Wu-Tang Clan - Enter the Wu-Tang (36 Chambers)",
    price: 30,
  },
];

export default function Home() {
  return (
    <>
      <main className="main-content">
        <h2>Ajouts récents</h2>
        <CardGrid>
          {LPS.map((lp) => (
            <LpCard key={lp.id} id={lp.id} title={lp.title} price={lp.price} />
          ))}
        </CardGrid>
      </main>
    </>
  );
}
