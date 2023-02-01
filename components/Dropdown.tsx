import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Sort by", value: "sort" },
    { label: "Name", value: "name", parent: "sort" },
    { label: "Date", value: "Date", parent: "sort" },
  ]);
  return (
    <DropDownPicker
      open={open}
      items={items}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default Dropdown;
