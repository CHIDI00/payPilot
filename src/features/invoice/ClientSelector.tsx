import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronDown, UserPlus, X } from "lucide-react";
import { getClients } from "@/services/apiClient";
import { Link } from "react-router-dom";
import Loader from "@/ui/Loader";

// CLIENT TYPE DEFINITION
type Client = {
  id: string;
  name: string;
  email: string;
  phone_number: number;
  address_line_1: string;
  address_line_2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  outstanding_balance: number;
  last_activity?: string | null;
};

// SELECTED CLIENT DATA INTERFACE
export interface SelectedClientData {
  client_name: string;
  client_email: string;
  client_street_address: string;
  client_city: string;
  client_state: string;
  client_post_code: string;
  client_country: string;
}

// COMPONENT PROPS
interface ClientSelectorProps {
  onClientSelect: (clientData: SelectedClientData) => void;
  selectedClientName?: string;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  onClientSelect,
  selectedClientName,
}) => {
  // STATE MANAGEMENT
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // FETCH CLIENTS DATA
  const {
    isLoading,
    data: clients,
    error,
  } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => (await getClients()) as unknown as Client[],
  });

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FILTER CLIENTS BASED ON SEARCH TERM
  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email &&
        client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // HANDLE CLIENT SELECTION
  const handleSelectClient = (client: Client) => {
    const clientData: SelectedClientData = {
      client_name: client.name,
      client_email: client.email,
      client_street_address: client.address_line_1 || "",
      client_city: client.city,
      client_state: client.state,
      client_post_code: client.zipcode || "",
      client_country: client.country,
    };

    onClientSelect(clientData);
    setIsOpen(false);
    setSearchTerm("");
  };

  // CLEAR SELECTION
  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClientSelect({
      client_name: "",
      client_email: "",
      client_street_address: "",
      client_city: "",
      client_state: "",
      client_post_code: "",
      client_country: "",
    });
  };

  return (
    <div className="relative w-full mb-6" ref={dropdownRef}>
      {/* SELECT CLIENT BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-[#252945] border border-gray-300 dark:border-[#303559] rounded-md text-[1.3rem] font-medium text-black dark:text-white hover:border-[#7C5DFA] dark:hover:border-[#7C5DFA] transition-colors"
      >
        <span className="flex items-center gap-3">
          <Search size={18} className="text-gray-400" />
          {selectedClientName || "Select Client"}
        </span>
        <div className="flex items-center gap-2">
          {selectedClientName && (
            <X
              size={18}
              className="text-gray-400 hover:text-red-500"
              onClick={handleClearSelection}
            />
          )}
          <ChevronDown
            size={18}
            className={`transition-transform text-gray-400 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#252945] border border-gray-300 dark:border-[#303559] rounded-lg shadow-lg z-50 max-h-[400px] overflow-hidden flex flex-col">
          {/* SEARCH INPUT */}
          <div className="p-4 border-b border-gray-200 dark:border-[#303559]">
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-[#1e2139] rounded-md">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none text-[1.3rem] text-black dark:text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* CLIENTS LIST */}
          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 text-[1.3rem]">
                Error loading clients
              </div>
            ) : !filteredClients || filteredClients.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-[1.3rem]">
                No clients found
              </div>
            ) : (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSelectClient(client)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-[#1e2139] transition-colors border-b border-gray-100 dark:border-[#303559] last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-[1.4rem] text-black dark:text-white mb-1">
                        {client.name}
                      </p>
                      <p className="text-[1.2rem] text-gray-500 dark:text-gray-400">
                        {client.email}
                      </p>
                      <p className="text-[1.2rem] text-gray-400 dark:text-gray-500 mt-1">
                        {client.city}, {client.state}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* CREATE NEW CLIENT LINK */}
          <div className="p-4 border-t border-gray-200 dark:border-[#303559] bg-gray-50 dark:bg-[#1e2139]">
            <Link
              to="/clients"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#7C5DFA] hover:bg-[#9277FF] text-white rounded-md text-[1.3rem] font-bold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus size={18} />
              Create New Client
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSelector;