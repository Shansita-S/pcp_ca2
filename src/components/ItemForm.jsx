import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const labelsBySet = {
  orders: "Order",
  activities: "Activity",
  courses: "Course",
  events: "Event",
};

const ItemForm = ({ setType }) => {
  const { addItem } = useAppContext();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const onlyLetters = /^[A-Za-z\s]+$/;
    if (!onlyLetters.test(name.trim())) {
      return;
    }

    addItem({
      id: Date.now(),
      name: name.trim(),
      status: "active",
      __displayName: name.trim(),
      __setType: setType,
    });

    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={`Add ${labelsBySet[setType] || "Item"}`}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ItemForm;
