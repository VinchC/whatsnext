// it will be used in the index file

import Link from "next/link";

export function DisplayLinkToCategory({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  return (
    <Link href={`categories/${id}`} className="category-navigation-link">
      {title}
    </Link>
  );
}
