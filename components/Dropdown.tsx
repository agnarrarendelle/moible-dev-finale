import { useState } from "react";
import { FilterOptions, SortOptions } from "../constant";
import DropDownPicker from "react-native-dropdown-picker";
type Prop = {
  sortBy: (option: string) => void;
};

type DropdownOption = {
  label: string;
  value: string;
  parent?: string;
};

const Dropdown = (prop: Prop) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropdownOption[]>([
    { label: "Sort by", value: "sort" },
    { label: "Name", value: SortOptions.Name, parent: "sort" },
    { label: "Date", value: SortOptions.Date, parent: "sort" },
    { label: "Filter tasks", value: "filter task" },
    {
      label: "Completed",
      value: FilterOptions.Completed,
      parent: "filter task",
    },
    {
      label: "Incompleted",
      value: FilterOptions.InCompleted,
      parent: "filter task",
    },
    { label: "All", value: FilterOptions.All, parent: "filter task" },
  ]);
  return (
    <DropDownPicker
      open={open}
      items={items}
      value={value}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(v) => prop.sortBy(v!)}
    />
  );
};

export default Dropdown;
