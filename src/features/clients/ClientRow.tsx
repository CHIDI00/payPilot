import React from "react";
import ClientActionMenu from "../../ui/ClientActionMenu"; // Adjust path if needed

// 1. Define what data this row accepts
interface ClientRowProps {
  id: string;
  name: string;
  email: string;
  state: string;
  phone_number: number;
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
  phone_number,
  balance,
  state,
  // lastActive,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full px-6 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1e2139] transition-colors grid grid-cols-[2fr_1.1fr_1.9fr_.7fr_1fr_2fr_.5fr] gap-5 items-center">
      {/* 1. Name & Email */}
      <div className="flex flex-col">
        <p className="text-[1.5rem] font-semibold text-[#0C0E16] dark:text-white truncate">
          {name}
        </p>
        <p className="text-[1.2rem] text-gray-400 truncate">{email}</p>
      </div>

      {/* 2. Phone_number */}
      <div className="text-[1.4rem] text-gray-500">{phone_number}</div>

      {/* 3. email */}
      <div className="text-[1.4rem] text-gray-500">{email}</div>

      {/* 4. invoices */}
      <div className="text-[1.4rem] text-gray-500">0</div>

      {/* 5. email */}
      <div className="text-[1.4rem] text-gray-500">{state}</div>

      {/* 6. Balance (Right Aligned for Money) */}
      <div className="text-left text-[1.4rem] font-medium text-[#0C0E16]">
        {balance}
      </div>

      {/* 4. Last Active / Date
      <div className="text-[1.3rem] text-gray-500 dark:text-gray-200">
        {lastActive}
      </div> */}

      {/* 7. The Dropdown Action Menu */}
      <div className="flex justify-end">
        <ClientActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default ClientRow;
