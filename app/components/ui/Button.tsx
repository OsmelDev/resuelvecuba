import { FC } from "react";

interface ButtonProps {
  action: () => void;
  label: string;
  filter: string;
  id: string;
}

const FilterButton: FC<ButtonProps> = ({ id, action, label, filter }) => {
  return (
    <button
      onClick={action}
      className={`px-3 py-1 rounded-full text-sm transition ${
        filter === id
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
