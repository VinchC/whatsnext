import Link from "next/link";

export default function DisplayLinkToCategory({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  return (
    <>
      <Link href={`/categories/${id}`} className="category-navigation-link">
        {title}
      </Link>
    </>
  );
}
