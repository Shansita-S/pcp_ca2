import { useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useAppContext } from "../context/AppContext";

const FilterPage = () => {
  const { validOrders, loading, error } = useAppContext();
  const [query, setQuery] = useState("");
  const [filterError, setFilterError] = useState("Please enter a restaurant name");

  const trimmedQuery = query.trim();

  const filtered = useMemo(() => {
    if (!trimmedQuery) {
      return [];
    }

    return validOrders.filter((order) => {
      const restaurantName = order?.restaurant || "";
      return restaurantName.includes(trimmedQuery);
    });
  }, [trimmedQuery, validOrders]);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);

    if (!nextValue.trim()) {
      setFilterError("Please enter a restaurant name");
      return;
    }

    setFilterError("");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Filter</h1>
      <input
        data-testid="filter-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Filter by restaurant"
      />

      {filterError ? <p>{filterError}</p> : null}

      {!filterError && trimmedQuery && filtered.length === 0 ? (
        <p>No results found</p>
      ) : null}

      {!filterError && filtered.map((item) => (
        <ItemCard key={String(item.orderId ?? item.id)} item={item} />
      ))}
    </section>
  );
};

export default FilterPage;
