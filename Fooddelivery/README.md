# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Dataset A - Food Delivery orders
Each order object contains:
orderId
customerName
restaurant
items -> {name,price,quantity}
totalAmount
status
deliveryTime
rating
Dataset contains incosistent and invalid entries.
you must build the react application using :
React context
useReducer
React Router

Mandatory Routes
/orders
/orders/:id
/filter
/stats

1.Use test IDs
data-testid="total-orders"
data-testid="delivered-orders"
data-testid="cancelled-orders"
data-testid="order-item"

2. Expose computed values
window.appState={
    totalOrders,
    deliveredOrders,
    cancelledOrders
};

Display Valid Orders
route: /orders
requirements:
display all valid orders only 
each order must be shown using a reuasable component 
Ignore orders where:
items array is empty
quantity<=0
totalAmount is invalid
constarints:
must use .map()
must use Context data
must not mutate original data

edge case
missing customerName-> display as "Unknown"
missing rating -> do not display rating

2. Order detail view
route: /orders/:id
requirements:
display complete details of selected order
show all items with calculated sub total

constraints:
must use route parameter
must validate id
must calculate subtotal dynamically

edge case:
invalid ID -> Show "Order not found"
missing fields: handle gracefully 

3. Filter Orders
route: /filter
requirements:
filter orders by restaurant name
input shld be case sensitive
display only matching orders

constraints:
must use .filter()
must not refetch data
must use global state

edge case:
empty input show errors
invalid restaurant -> show "No results found"
filtered results must reflect only valid orders(Q1 rules)

4. Order Status Logic
route: /orders
requirements:
add ability to mark an order as Delivered

Logic:
if order is marked as Delivered:
it must not appear in Pending list
Stats must update automatically 

constraints:
must use reducer action
must not directly modify state

edge case







