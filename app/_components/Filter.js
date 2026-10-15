"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterButton({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        filter={"all"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </FilterButton>
      <FilterButton
        filter={"small"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        filter={"medium"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        filter={"large"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </FilterButton>
    </div>
  );
}
export default Filter;
