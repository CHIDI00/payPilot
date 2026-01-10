import React, { useState } from "react";

// UI Components
import FormColumn from "../../ui/FormColumn";
import FormSubTitle from "../../ui/FormSubTitle";
import Button from "../../ui/Button";
import ClientSelector from "./ClientSelector";
import type { SelectedClientData } from "./ClientSelector";

// Form handling
import { useForm, useFieldArray } from "react-hook-form";

// Icons
import { ChevronLeft, Plus, Trash, ChevronDown } from "lucide-react";

// Custom hooks and utilities
import { useCreateInvoice } from "./useCreateInvoice";
import { useEditInvoice } from "./useEditInvoice";
import type { Invoice } from "../../utils/types";
import { generateInvoiceId } from "../../utils/helper";
import toast from "react-hot-toast";
import { useCompanyInfo } from "../acount/useCompanyInfo";

// Props interface for the component
interface ClosesModalProp {
  onCloseModal: () => void;
  invoiceToEdit: Invoice | null;
}

// Interface for individual invoice items (Form version)
interface InvoiceItemFormData {
  name: string;
  quantity: number;
  price: number;
}

// Interface for the complete invoice form data
interface InvoiceFormData {
  id: string;
  invoice_id: string;
  public_uuid: string;
  street_address?: string;
  post_code?: string;
  state: string;
  city?: string;
  country?: string;
  client_name?: string;
  client_email?: string;
  client_street_address?: string;
  client_state: string;
  client_city?: string;
  client_post_code?: string;
  client_country?: string;
  invoice_date?: string;
  payment_terms?: string;
  description?: string;
  accountNo?: number;
  status: string;
  company_id: string;

  items: InvoiceItemFormData[]; // Form uses 'items'
}

// Type for the invoice action - determines how the invoice is saved
type InvoiceAction = "draft" | "pending" | "paid";

// Interface for action options in the dropdown
interface ActionOption {
  value: InvoiceAction;
  label: string;
  color: string;
}

const CreateInvoiceForm: React.FC<ClosesModalProp> = ({
  invoiceToEdit,
  onCloseModal,
}) => {
  // Custom hooks for invoice operations
  const { createInvoice, isCreating } = useCreateInvoice();
  const { editInvoice, isEditing } = useEditInvoice();
  const { companyInfo } = useCompanyInfo();

  // Extract company information for default values
  const { companyStreet, companyCity, companyCountry } = companyInfo || {};

  // Check if any operation is in progress
  const isWorking = isCreating || isEditing;

  // Separate the id and items from the rest of the invoice data for editing
  // NOTE: We rename invoice_items to items for the form state
  const {
    id: editId,
    invoice_items, // Grab the array from DB
    ...editValue
  } = invoiceToEdit ?? {};

  const isEditSession = Boolean(editId);

  // STATE FOR DROPDOWN ACTION SELECTION
  const [selectedAction, setSelectedAction] = useState<InvoiceAction>("paid");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // STATE FOR SELECTED CLIENT NAME DISPLAY
  const [selectedClientName, setSelectedClientName] = useState<string>("");

  // Action options for the dropdown menu
  const actionOptions: ActionOption[] = [
    {
      value: "draft",
      label: "Save as Draft",
      color: "bg-[#373B53] dark:bg-[#0C0E16]",
    },
    { value: "pending", label: "Save as Pending", color: "bg-orange-600" },
    { value: "paid", label: "Save & Send", color: "bg-green-600" },
  ];

  // INITIALIZE REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<InvoiceFormData>({
    defaultValues: isEditSession
      ? {
          ...editValue,
          // MAPPING: Convert DB 'invoice_items' -> Form 'items'
          items: invoice_items || [],
        }
      : {
          items: [{ name: "", quantity: 0, price: 0 }],
        },
  });

  // Extract form errors from form state
  const { errors } = formState;

  // useFieldArray for dynamically managing invoice items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Watch all items to trigger re-render when values change
  const watchedItems = watch("items");

  // GET THE CURRENTLY SELECTED ACTION OPTION
  const currentAction = actionOptions.find(
    (opt) => opt.value === selectedAction
  );

  const handleClientSelect = (clientData: SelectedClientData) => {
    setValue("client_name", clientData.client_name);
    setValue("client_email", clientData.client_email);
    setValue("client_street_address", clientData.client_street_address);
    setValue("client_city", clientData.client_city);
    setValue("client_state", clientData.client_state);
    setValue("client_post_code", clientData.client_post_code);
    setValue("client_country", clientData.client_country);
    setSelectedClientName(clientData.client_name);
  };

  const handleActionSubmit = (data: InvoiceFormData) => {
    switch (selectedAction) {
      case "draft":
        onSaveDraft();
        break;
      case "pending":
        onSavePending(data);
        break;
      case "paid":
        onSubmit(data);
        break;
    }
  };

  // HELPER: Convert Form Data ('items') -> Backend Data ('invoice_items')
  // We explicitly cast to 'any' or 'Invoice' because the hook expects Invoice structure
  const prepareDataForSubmit = (
    data: Partial<InvoiceFormData>,
    status: string
  ) => {
    const { items, ...rest } = data;

    return {
      ...rest,
      status,
      // MAPPING: Convert Form 'items' -> DB 'invoice_items'
      invoice_items: items?.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    } as unknown as Invoice;
  };

  /**
   * Save invoice as Paid
   */
  function onSubmit(data: InvoiceFormData) {
    const finalData = prepareDataForSubmit(data, "Paid");

    if (isEditSession && editId) {
      editInvoice(
        { newInvoiceData: finalData, id: editId! },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const newInvoice = {
        ...finalData,
        invoice_id: generateInvoiceId(),
      };

      createInvoice(
        { id: data.id, newInvoice },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  /**
   * Save invoice as Pending
   */
  function onSavePending(data: InvoiceFormData) {
    const finalData = prepareDataForSubmit(data, "Pending");

    const newInvoice = {
      ...finalData,
      invoice_id: generateInvoiceId(),
    };

    createInvoice(
      { id: data.id, newInvoice },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  /**
   * Save invoice as Draft
   */
  function onSaveDraft() {
    const draftData = getValues();
    const finalData = prepareDataForSubmit(draftData, "Draft");

    const newInvoice = {
      ...finalData,
      invoice_id: generateInvoiceId(),
    };

    createInvoice(
      { id: draftData.id, newInvoice },
      {
        onSuccess: () => {
          toast.success("Invoice saved as draft");
          reset();
          onCloseModal?.();
        },
        onError: () => {
          toast.error("An error occurred");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(handleActionSubmit)}>
      {/* HEADER SECTION */}
      <div className="w-full mb-10">
        {isEditSession && (
          <button
            type="button"
            onClick={onCloseModal}
            className="flex justify-between items-center gap-7 text-[1.7rem] dark:text-[#FFF]"
          >
            <span>
              <ChevronLeft size={18} />
            </span>{" "}
            Close
          </button>
        )}
      </div>

      {/* FORM TITLE */}
      {isEditSession ? (
        <h2 className="font-bold text-[2.1rem] dark:text-[#FFF] mb-10">
          Edit <span className="text-[#7E88C3]">#</span>
          {invoiceToEdit?.invoice_id}
        </h2>
      ) : (
        <h2 className="font-bold text-[2.1rem] dark:text-[#FFF] mb-10">
          New Invoice
        </h2>
      )}
      {/* BILL FROM SECTION - Company/Sender Information */}
      <div className="my-6">
        <FormSubTitle>Bill From</FormSubTitle>

        {/* STREET ADDRESS */}

        <FormColumn label="Street Adress" error={errors.street_address}>
          <input
            type="text"
            id="street_address"
            defaultValue={companyStreet}
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.street_address ? "border-red-600" : "border-gray-300"
            }`}
            {...register("street_address", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
          <FormColumn label="City" error={errors.city}>
            <input
              type="text"
              id="city"
              defaultValue={companyCity}
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("city", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="State" error={errors.state}>
            <input
              type="text"
              id="State"
              // defaultValue={state}
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.state ? "border-red-600" : "border-gray-300"
              }`}
              {...register("state", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn label="Post Code" error={errors.post_code}>
            <input
              type="text"
              id="post_code"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("post_code", {
                required: "*",
              })}
            />
          </FormColumn>
          <FormColumn
            label="Country"
            error={errors.country}
            className="col-span-2 md:col-span-1"
          >
            <input
              type="text"
              id="country"
              defaultValue={companyCountry}
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.country ? "border-red-600" : "border-gray-300"
              }`}
              {...register("country", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>
        {/* ACCOUNT NUMBER */}
        <FormColumn label="Account No" error={errors.payment_terms}>
          <input
            type="text"
            id="accountNo"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.accountNo ? "border-red-600" : "border-gray-300"
            }`}
            {...register("accountNo", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
      </div>

      {/* ---------------------BILL TO SECTION - CLIENT INFORMATION--------------------- */}
      <div className="my-6">
        <FormSubTitle>Bill To</FormSubTitle>

        {/* CLIENT SELECTOR DROPDOWN */}
        <ClientSelector
          onClientSelect={handleClientSelect}
          selectedClientName={selectedClientName}
        />

        <FormColumn label="Client's Name" error={errors.client_name}>
          <input
            type="text"
            id="client_name"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_name ? "border-red-600" : "border-gray-300"
            }`}
            {...register("client_name", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Client's Email" error={errors.client_email}>
          <input
            type="email"
            id="client_email"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_email ? "border-red-600" : "border-gray-300"
            }`}
            {...register("client_email", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <FormColumn label="Street Address" error={errors.client_street_address}>
          <input
            type="text"
            id="client_street_address"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.client_street_address
                ? "border-red-600"
                : "border-gray-300"
            }`}
            {...register("client_street_address", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2">
          {/* CLIENT'S CITY */}
          <FormColumn label="City" error={errors.client_city}>
            <input
              type="text"
              id="client_city"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_city ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_city", {
                required: "*",
              })}
            />
          </FormColumn>
          {/* CLIENT'S CITY */}
          <FormColumn label="State" error={errors.state}>
            <input
              type="text"
              id="client_state"
              // defaultValue={client_state}
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_state ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_state", {
                required: "*",
              })}
            />
          </FormColumn>

          {/* CLIENT'S POST CODE */}
          <FormColumn label="Post Code" error={errors.client_post_code}>
            <input
              type="text"
              id="client_post_code"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_post_code ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_post_code", {
                required: "*",
              })}
            />
          </FormColumn>

          {/* CLIENT'S COUNTRY */}
          <FormColumn
            label="Country"
            error={errors.client_country}
            className="col-span-2 md:col-span-1"
          >
            <input
              type="text"
              id="client_country"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.client_country ? "border-red-600" : "border-gray-300"
              }`}
              {...register("client_country", {
                required: "*",
              })}
            />
          </FormColumn>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* INVOICE DATE */}
          <FormColumn label="Payment Date" error={errors.invoice_date}>
            <input
              type="date"
              id="invoice_date"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.invoice_date ? "border-red-600" : "border-gray-300"
              }`}
              {...register("invoice_date", {
                required: "can't be empty",
              })}
            />
          </FormColumn>

          {/* PAYMENT TERMS */}
          <FormColumn label="Payment Terms" error={errors.payment_terms}>
            <input
              type="text"
              id="payment_terms"
              className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
                errors.payment_terms ? "border-red-600" : "border-gray-300"
              }`}
              {...register("payment_terms", {
                required: "can't be empty",
              })}
            />
          </FormColumn>
        </div>

        {/* PROJECT DESCRIPTION */}
        <FormColumn label="Description" error={errors.description}>
          <input
            type="text"
            id="description"
            className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] border-gray-300 py-3 px-6 font-bold rounded-md ${
              errors.description ? "border-red-600" : "border-gray-300"
            }`}
            {...register("description", {
              required: "can't be empty",
            })}
          />
        </FormColumn>
      </div>

      {/* ITEM LIST SECTION - Dynamic line items */}
      <div className="my-14">
        <FormSubTitle>Item List</FormSubTitle>

        {/* Table headers for desktop view */}
        <div className="hidden md:grid grid-cols-[3fr_.8fr_1.3fr_1fr_.4fr] gap-7 mb-5">
          <p className="text-[#7E88C3] text-[1.4rem]">Item Name</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">QTY.</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Price</p>
          <p className="text-[#7E88C3] text-[1.4rem] text-left">Total</p>
          <div></div>
        </div>

        {/* Dynamic item rows - controlled by useFieldArray */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid md:grid-cols-[3fr_1fr_1.3fr_1fr_.4fr] grid-cols-[1.5fr_1.5fr_.7fr_.3fr] justify-center items-center gap-7 mb-4"
          >
            {/* ITEM NAME */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `Item` : ""}`}
              error={errors.items?.[index]?.name}
              className="col-span-5 md:col-span-1"
            >
              <input
                type="text"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-6 font-bold rounded-md ${
                  errors.items?.[index]?.name
                    ? "border-red-600 dark:border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.name` as const, {
                  required: "Item name",
                })}
              />
            </FormColumn>

            {/* QUANTITY */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `QTY` : ""}`}
              error={errors.items?.[index]?.quantity}
            >
              <input
                type="number"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-2 font-bold rounded-md ${
                  errors.items?.[index]?.quantity
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.quantity` as const, {
                  required: "Required",
                  valueAsNumber: true,
                })}
              />
            </FormColumn>

            {/* PRICE */}
            <FormColumn
              label={`${window.innerWidth <= 480 ? `Price` : ""}`}
              error={errors.items?.[index]?.price}
            >
              <input
                type="number"
                step="0.01"
                className={`w-full bg-transparent text-[1.3rem] text-black dark:text-[#FFF] dark:bg-[#252945] dark:border-[#303559] border-[1px] py-3 px-2 font-bold rounded-md ${
                  errors.items?.[index]?.price
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                {...register(`items.${index}.price` as const, {
                  required: "Required",
                  valueAsNumber: true,
                })}
              />
            </FormColumn>

            {/* TOTAL PRICE - Calculated automatically and updates in real-time */}
            <p className="text-[#000] dark:text-white font-bold text-[1.7rem] ">
              {(
                (watchedItems?.[index]?.quantity ?? 0) *
                (watchedItems?.[index]?.price ?? 0)
              ).toFixed(2)}
            </p>

            {/* DELETE ITEM BUTTON */}
            <div
              className="cursor-pointer dark:text-white"
              onClick={() => remove(index)}
            >
              <Trash />
            </div>
          </div>
        ))}

        {/* ADD NEW ITEM BUTTON */}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: 0, price: 0 })}
          className="flex justify-center items-center gap-3 w-full px-10 lg:py-7 py-5 mt-5 text-[#7C5DFA] dark:text-[#DFE3FA] font-bold bg-primary-gray100 dark:bg-[#252945] rounded-full"
        >
          <Plus size={15} /> Add New Item
        </button>
      </div>

      {/* FORM ACTIONS - Different button layouts for edit vs create */}
      {isEditSession ? (
        // EDIT MODE - Simple Save/Cancel buttons
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            className="font-bold"
            onClick={() => {
              onCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button className="font-bold" type="submit" disabled={isWorking}>
            Save changes
          </Button>
        </div>
      ) : (
        // CREATE MODE - Discard button + Dropdown selector + Dynamic submit button
        <div className="flex items-center justify-between">
          {/* Discard button */}
          <div className="">
            <Button
              type="button"
              variant="secondary"
              className="font-bold px-7 text-[13px]"
              onClick={onCloseModal}
            >
              Discard
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* DROPDOWN SELECTOR - Choose save action */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] rounded-full font-bold text-[13px] hover:bg-[#DFE3FA] dark:hover:bg-[#373B53] transition-colors"
              >
                <span>{currentAction?.label}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-white dark:bg-[#252945] rounded-lg shadow-lg border border-gray-200 dark:border-[#303559] py-2 min-w-[180px] z-10">
                  {actionOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSelectedAction(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] font-medium hover:bg-gray-100 dark:hover:bg-[#373B53] transition-colors ${
                        selectedAction === option.value
                          ? "text-[#7C5DFA] dark:text-[#7C5DFA]"
                          : "text-[#0C0E16] dark:text-[#FFF]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DYNAMIC SUBMIT BUTTON - Changes based on selected action */}
            <button
              type="submit"
              disabled={isWorking}
              className={`font-bold text-[13px] px-6 py-4 rounded-full text-white transition-colors ${
                currentAction?.color
              } ${
                isWorking ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {selectedAction === "draft"
                ? "Save Draft"
                : selectedAction === "pending"
                ? "Save Pending"
                : "Save & Send"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateInvoiceForm;
