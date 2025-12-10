import { Bell, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import { useNotifications } from "@/hooks/useNotifications";

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

interface HeaderProp {
  setMenuIsOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProp> = ({ setMenuIsOpen }) => {
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const { notifications, hasUnread, markAllRead } = useNotifications();

  const getTitleFromPath = (pathname: string) => {
    const parts = pathname.split("/").filter(Boolean);
    const key = parts.length ? parts[0] : "dashboard";
    return key
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
  };

  function toggleNotification() {
    setShowNotification((show) => {
      const next = !show;
      if (!show && next) markAllRead();
      return next;
    });
  }

  // Debounced dispatch so other parts of the app can listen to invoice searches
  useEffect(() => {
    const t = setTimeout(() => {
      // dispatch a custom event with the search term
      window.dispatchEvent(
        new CustomEvent("invoiceSearch", { detail: { query: searchTerm } })
      );
    }, 300);

    return () => clearTimeout(t);
  }, [searchTerm]);

  // const { created_at, title, body, read } = notifications?.[0] || {};
  return (
    <div className="sticky z-[20] top-0 left-0 flex items-center justify-between w-full px-6 py-5 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center justify-start gap-5">
        <div
          onClick={() => setMenuIsOpen(true)}
          className="flex flex-col items-center justify-between gap-2 lg:hidden"
        >
          <span className="w-8 h-[0.15rem] bg-black rounded-full"></span>
          <span className="w-8 h-[0.15rem] bg-black ml-3 rounded-full"></span>
          <span className="w-8 h-[0.15rem] bg-black rounded-full"></span>
        </div>
        <h2 className="font-bold text-[2.5rem]">
          {getTitleFromPath(location.pathname)}
        </h2>
      </div>

      {location.pathname.startsWith("/invoices") && (
        <div className="flex items-center justify-center flex-1 max-w-lg gap-4 px-4 mx-6 bg-white border rounded-full border-gray-50">
          <Search />
          <input
            aria-label="Search invoices"
            placeholder="Search by invoice ID or client name"
            className="w-full px-4 py-2 bg-transparent rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          className="relative rounded-full"
          onClick={toggleNotification}
        >
          <Bell size={15} />

          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </Button>

        {showNotification && (
          <div className="absolute top-[3rem] -right-2 w-[35rem] bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center w-full px-6 py-4 border-b border-gray-200">
              <p className="font-bold">Notification</p>
            </div>

            {!notifications && (
              <div className="flex flex-col items-center justify-start w-full p-4">
                <p className="my-6">No notifications</p>
              </div>
            )}

            {notifications.map((n, i) => (
              <div
                key={n.id ?? i}
                className={`flex flex-col w-full p-6 gap-1 ${
                  i !== notifications.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } ${!n.read ? "bg-purple-50" : "bg-white"}`}
              >
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[1.4rem]">{n.title}</p>
                  {!n.read && (
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  )}
                </div>
                <p className="text-2xl text-gray-700">{n.body}</p>
                <p className="text-gray-400 text-xl">
                  {n.created_at && formatDateTime(n.created_at)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
