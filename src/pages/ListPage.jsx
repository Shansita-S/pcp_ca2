import ItemCard from "../components/ItemCard";
import { useAppContext } from "../context/AppContext";
import { isPendingOrder } from "../utils/orderUtils";

const ListPage = () => {
  const { validOrders, loading, error, markOrderAsDelivered } = useAppContext();
  const pendingOrders = validOrders.filter((order) => isPendingOrder(order));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Pending Orders</h1>
      {pendingOrders.map((item) => (
        <ItemCard
          key={String(item.orderId ?? item.id)}
          item={item}
          onMarkDelivered={markOrderAsDelivered}
        />
      ))}
      {pendingOrders.length === 0 ? <p>No pending orders</p> : null}
    </section>
  );
};

export default ListPage;
