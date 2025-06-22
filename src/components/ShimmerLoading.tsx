import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  cantidad?: number;
};

export default function ShimmerCardLista({ cantidad = 4 }: Props) {
  return (
    <ul className="space-y-2 text-sm">
      {Array.from({ length: cantidad }).map((_, i) => (
        <li key={i} className="flex items-center gap-2">
          <Skeleton
            circle
            height={24}
            width={24}
            baseColor="#2a2a2a"
            highlightColor="#444"
          />
          <Skeleton
            width={120}
            height={12}
            baseColor="#2a2a2a"
            highlightColor="#444"
          />
        </li>
      ))}
    </ul>
  );
}
