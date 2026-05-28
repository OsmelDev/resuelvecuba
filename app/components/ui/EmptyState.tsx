import { ReactNode } from "react";
import {
  Package,
  Search,
  Bell,
  Calendar,
  Users,
  ShoppingBag,
} from "lucide-react";

const icons = {
  package: Package,
  search: Search,
  bell: Bell,
  calendar: Calendar,
  users: Users,
  shopping: ShoppingBag,
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: keyof typeof icons;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon = "package",
  action,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="bg-white rounded-lg shadow p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
