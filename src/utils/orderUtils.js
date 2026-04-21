export const isValidOrder = (order) => {
  if (!order || typeof order !== "object") {
    return false;
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    return false;
  }

  const hasInvalidQuantity = order.items.some(
    (item) => !item || Number(item.quantity) <= 0,
  );

  if (hasInvalidQuantity) {
    return false;
  }

  const totalAmount = Number(order.totalAmount);
  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return false;
  }

  return true;
};

export const extractOrdersFromDataset = (dataset) => {
  if (Array.isArray(dataset)) {
    return dataset;
  }

  if (!dataset || typeof dataset !== "object") {
    return [];
  }

  if (Array.isArray(dataset.orders)) {
    return dataset.orders;
  }

  if (Array.isArray(dataset.data)) {
    return dataset.data;
  }

  if (dataset.data && typeof dataset.data === "object") {
    if (Array.isArray(dataset.data.orders)) {
      return dataset.data.orders;
    }
  }

  return [];
};

export const normalizeOrder = (order, index) => {
  const id =
    order?.id ?? order?.orderId ?? order?._id ?? order?.orderID ?? index + 1;

  return {
    ...order,
    id,
    customerName:
      typeof order?.customerName === "string" && order.customerName.trim()
        ? order.customerName
        : "Unknown",
    items: Array.isArray(order?.items) ? order.items : [],
  };
};

export const isPendingOrder = (order) => {
  return String(order?.status || "").toLowerCase() === "pending";
};

export const getDeliveredOrdersCount = (orders) => {
  return orders.filter(
    (order) => String(order?.status || "").toLowerCase() === "delivered",
  ).length;
};

export const getCancelledOrdersCount = (orders) => {
  return orders.filter(
    (order) => String(order?.status || "").toLowerCase() === "cancelled",
  ).length;
};
