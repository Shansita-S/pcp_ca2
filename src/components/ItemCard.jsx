import { Link } from "react-router-dom";
const ItemCard = ({ item, onMarkDelivered }) => {
  const orderId = item?.orderId ?? item?.id;
  const customerName = item?.customerName || "Unknown";

  return (
    <div data-testid="order-item">
      <p>Order ID: {String(orderId ?? "N/A")}</p>
      <p>Customer: {customerName}</p>
      <p>Restaurant: {item?.restaurant || "N/A"}</p>
      <p>Total: {Number(item?.totalAmount) || 0}</p>
      <p>Status: {item?.status || "Unknown"}</p>
      <p>Delivery Time: {item?.deliveryTime || "N/A"}</p>
      {item?.rating !== undefined && item?.rating !== null ? (
        <p>Rating: {item.rating}</p>
      ) : null}
      <Link to={`/orders/${orderId}`}>View Details</Link>
      {typeof onMarkDelivered === "function" ? (
        <button type="button" onClick={() => onMarkDelivered(orderId)}>
          Mark as Delivered
        </button>
      ) : null}
    </div>
  );
};

export default ItemCard;
