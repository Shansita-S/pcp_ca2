const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: "",
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "MARK_ORDER_DELIVERED":
      if (
        action.payload === undefined ||
        action.payload === null ||
        String(action.payload).trim() === ""
      ) {
        return state;
      }

      return {
        ...state,
        orders: state.orders.map((order) => {
          const currentId = String(order?.orderId ?? order?.id ?? "");
          const targetId = String(action.payload ?? "");

          if (currentId !== targetId) {
            return order;
          }

          return {
            ...order,
            status: "Delivered",
          };
        }),
      };

    default:
      return state;
  }
};

export default AppReducer;
