import ItemCard from "../components/ItemCard";
import { useAppContext } from "../context/AppContext";

const ListPage = () => {
  const { validOrders, loading, error } = useAppContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Orders</h1>
      {validOrders.map((item) => (
        <ItemCard key={String(item.orderId ?? item.id)} item={item} />
      ))}
    </section>
  );
};

export default ListPage;
