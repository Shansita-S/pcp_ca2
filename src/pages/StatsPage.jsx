import { useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import {
  getCancelledOrdersCount,
  getDeliveredOrdersCount,
} from "../utils/orderUtils";

const StatsPage = () => {
  const { validOrders, loading, error } = useAppContext();

  const totalOrders = useMemo(() => validOrders.length, [validOrders]);
  const deliveredOrders = useMemo(
    () => getDeliveredOrdersCount(validOrders),
    [validOrders],
  );
  const cancelledOrders = useMemo(
    () => getCancelledOrdersCount(validOrders),
    [validOrders],
  );

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [cancelledOrders, deliveredOrders, totalOrders]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Stats</h1>

      <div data-testid="total-orders">{totalOrders}</div>
      <div data-testid="delivered-orders">{deliveredOrders}</div>
      <div data-testid="cancelled-orders">{cancelledOrders}</div>
    </section>
  );
};

export default StatsPage;
