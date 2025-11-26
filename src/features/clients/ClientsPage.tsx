import Button from "@/ui/Button";
import React from "react";
import ClientTable from "./ClientTable";
import ClientRow from "./ClientRow";
import { Search } from "lucide-react";

const ClientsPage: React.FC = () => {
  return (
    <div className="w-full my-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center flex-1 max-w-lg gap-4 px-4 bg-white border border-gray-300 rounded-full">
          <Search />
          <input
            aria-label="Search invoices"
            placeholder="Search clients"
            className="w-full px-4 py-2 bg-transparent rounded-md"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Add new client</Button>
      </div>

      <div className="flex flex-col w-full my-10 border-[1px] border-gray-300 rounded-2xl">
        <ClientTable />
        <div className="w-full">
          <ClientRow />
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
