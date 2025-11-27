import React from "react";
import ClientActionMenu from "../../components/ui/ClientActionMenu"; // Adjust path if needed

// 1. Define what data this row accepts
interface ClientRowProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: string; // or number, depending on how you format it before passing
  lastActive: string;
  // Handler functions passed down from the parent
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ClientRow: React.FC<ClientRowProps> = ({
  name,
  email,
  phone,
  balance,
  lastActive,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full px-6 py-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1e2139] transition-colors grid grid-cols-[2fr_1fr_1fr_1fr_.3fr] gap-5 items-center">
      {/* 1. Name & Email */}
      <div className="flex flex-col">
        <p className="text-[1.5rem] font-bold text-[#0C0E16] dark:text-white truncate">
          {name}
        </p>
        <p className="text-[1.2rem] text-gray-400 truncate">{email}</p>
      </div>

      {/* 2. Phone */}
      <div className="text-[1.3rem] text-gray-500 dark:text-gray-200">
        {phone}
      </div>

      {/* 3. Balance (Right Aligned for Money) */}
      <div className="text-right text-[1.4rem] font-bold text-[#0C0E16] dark:text-white">
        {balance}
      </div>

      {/* 4. Last Active / Date */}
      <div className="text-[1.3rem] text-gray-500 dark:text-gray-200">
        {lastActive}
      </div>

      {/* 5. The Dropdown Action Menu */}
      <div className="flex justify-end">
        <ClientActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default ClientRow;
