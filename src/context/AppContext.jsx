import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import AppReducer from "../reducer/AppReducer";
import { getDataset, getToken } from "../services/api";
import { isValidOrder, normalizeOrder } from "../utils/orderUtils";

const initialState = {
  orders: [],
  loading: true,
  error: "",
};

const PASSWORD = "546606";

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get token with password
        const tokenRes = await getToken(PASSWORD);

        // Step 2: Fetch dataset using token + dataUrl
        const response = await getDataset(tokenRes.token, tokenRes.dataUrl);

        const safeOrders = Array.isArray(response) ? response : [];

        const normalizedOrders = safeOrders.map((order, index) =>
          normalizeOrder(order, index),
        );

        dispatch({
          type: "SET_ORDERS",
          payload: normalizedOrders,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error?.response?.data?.message || error?.message || "Failed to load dataset",
        });
      }
    };

    fetchData();
  }, []);

  const validOrders = useMemo(
    () => state.orders.filter((order) => isValidOrder(order)),
    [state.orders],
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        validOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
