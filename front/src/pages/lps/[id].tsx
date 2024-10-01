import { useParams } from "next/navigation";
import LpDetails from "@/components/LpDetails/LpDetails";

export default function Lp() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return "Loading...";
  }

  return <LpDetails />;
}
