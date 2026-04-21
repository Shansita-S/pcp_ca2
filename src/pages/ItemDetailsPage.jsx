import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const { validOrders, loading, error } = useAppContext();

  const isValidId = id !== undefined && id !== null && String(id).trim().length > 0;

  const item = useMemo(
    () => validOrders.find((entry) => String(entry.orderId ?? entry.id) === String(id)),
    [id, validOrders],
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!isValidId || !item) {
    return <p>Order not found</p>;
  }

  return (
    <section>
      <h2>Order Details</h2>
      <p>Order ID: {String(item.orderId ?? item.id ?? "N/A")}</p>
      <p>Customer: {item.customerName || "Unknown"}</p>
      <p>Restaurant: {item.restaurant || "N/A"}</p>
      <p>Total Amount: {Number(item.totalAmount) || 0}</p>
      <p>Status: {item.status || "Unknown"}</p>
      <p>Delivery Time: {item.deliveryTime || "N/A"}</p>
      {item.rating !== undefined && item.rating !== null ? (
        <p>Rating: {item.rating}</p>
      ) : null}

      <h3>Items</h3>
      {Array.isArray(item.items) && item.items.length > 0 ? (
        <ul>
          {item.items.map((entry, index) => {
            const quantity = Number(entry?.quantity) || 0;
            const price = Number(entry?.price) || 0;
            const subtotal = quantity * price;

            return (
              <li key={`${entry?.name || "item"}-${index}`}>
                {entry?.name || "Unnamed Item"} | Price: {price} | Quantity: {quantity} |
                Subtotal: {subtotal}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </section>
  );
};

export default ItemDetailsPage;
