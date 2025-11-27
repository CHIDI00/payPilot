import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

interface ClientActionMenuProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClientActionMenu({
  onView,
  onEdit,
  onDelete,
}: ClientActionMenuProps) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        {/* The Trigger Button (Three Dots) */}
        <div>
          <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9277FF] focus-visible:ring-opacity-75 dark:text-gray-300 dark:hover:bg-gray-800">
            <MoreVertical className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        {/* The Dropdown Panel */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#252945] dark:divide-gray-700 dark:ring-gray-700">
            <div className="px-1 py-1">
              {/* View Client Details */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onView}
                    className={`${
                      active
                        ? "bg-[#9277FF] text-white"
                        : "text-gray-900 dark:text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-4 text-md`}
                  >
                    <Eye className="w-5 h-5 mr-2" aria-hidden="true" />
                    View details
                  </button>
                )}
              </Menu.Item>

              {/* Edit Details */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onEdit}
                    className={`${
                      active
                        ? "bg-[#9277FF] text-white"
                        : "text-gray-900 dark:text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-4 text-md`}
                  >
                    <Edit className="w-5 h-5 mr-2" aria-hidden="true" />
                    Edit details
                  </button>
                )}
              </Menu.Item>
            </div>

            {/* Delete Client (Separate section for safety) */}
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={`${
                      active
                        ? "bg-red-500 text-white"
                        : "text-gray-900 dark:text-gray-200"
                    } group flex w-full items-center rounded-md px-2 py-4 text-md font-medium text-red-600 dark:text-red-400 hover:text-white`}
                  >
                    {/* The icon color changes on hover to match the text */}
                    <Trash2
                      className={`mr-2 h-5 w-5 ${
                        active ? "text-white" : "text-red-500 dark:text-red-400"
                      }`}
                      aria-hidden="true"
                    />
                    Delete client
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
