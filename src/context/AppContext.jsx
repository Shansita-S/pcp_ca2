import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import AppReducer from "../reducer/AppReducer";
import { getDataset, getToken } from "../services/api";
import { extractOrdersFromDataset, isValidOrder, normalizeOrder } from "../utils/orderUtils";

const initialState = {
  orders: [],
  loading: true,
  error: "",
};

const STUDENT_ID = "E0223003";
const PASSWORD = "546606";
const DATA_SET = "setA";

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING" });

        // IMPORTANT: pass all 3 arguments
        const tokenRes = await getToken(STUDENT_ID, PASSWORD, DATA_SET);

        if (!tokenRes?.token || !tokenRes?.dataUrl) {
          throw new Error(
            `Token response missing token/dataUrl: ${JSON.stringify(tokenRes)}`,
          );
        }

        const dataset = await getDataset(tokenRes.token, tokenRes.dataUrl);
        const safeOrders = extractOrdersFromDataset(dataset);

        const normalizedOrders = safeOrders.map((order, index) =>
          normalizeOrder(order, index),
        );

        dispatch({ type: "SET_ORDERS", payload: normalizedOrders });
      } catch (error) {
        console.error("Fetch failed:", error?.response?.data || error);
        dispatch({
          type: "SET_ERROR",
          payload:
            error?.response?.data?.message ||
            error?.message ||
            "Failed to load dataset",
        });
      }
    };

    fetchData();
  }, []);

  const validOrders = useMemo(
    () => state.orders.filter((order) => isValidOrder(order)),
    [state.orders],
  );

  const markOrderAsDelivered = (orderId) => {
    dispatch({ type: "MARK_ORDER_DELIVERED", payload: orderId });
  };

  return (
    <AppContext.Provider value={{ ...state, validOrders, markOrderAsDelivered }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
