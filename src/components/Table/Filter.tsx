// ----------------------- React -----------------------
import { useEffect } from "react";
// ----------------------- Hooks -----------------------
import { useField } from "../../common/hooks/useField";

interface FilterTypes {
  onFilterChange: (filter: string) => void;
}

function Filter({ onFilterChange }: FilterTypes) {
  const [filter] = useField({ name: "filter", type: "text" });

  useEffect(() => {
    const delay = setTimeout(() => {
      onFilterChange(filter.value);
    }, 1500);

    // Delay when finish input
    return () => clearTimeout(delay);
  }, [filter.value]);

  return (
    <input
      {...filter}
      placeholder="Buscar"
      className="md:w-1/2 md:ml-auto px-4 py-3 leading-tight text-black bg-white border border-gray-200 focus:border-cwz-secondary rounded focus:outline-none"
    />
  );
}

export default Filter;
