type InvoiceStatus = "Paid" | "Pending" | "Draft";

interface Invoice {
  id: string;
  dueDate: Date; // 👈 now a real Date object
  clientName: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
}

const invoices: Invoice[] = [
  {
    id: "RT3080",
    dueDate: new Date("2021-08-19"),
    clientName: "Jensen Huang",
    amount: 1800.9,
    currency: "GBP",
    status: "Paid",
  },
  {
    id: "XM9141",
    dueDate: new Date("2021-09-20"),
    clientName: "Alex Grim",
    amount: 556.0,
    currency: "GBP",
    status: "Pending",
  },
  {
    id: "RG0314",
    dueDate: new Date("2021-10-01"),
    clientName: "John Morrison",
    amount: 14002.33,
    currency: "GBP",
    status: "Paid",
  },
  {
    id: "RT2080",
    dueDate: new Date("2021-10-12"),
    clientName: "Alysa Werner",
    amount: 102.04,
    currency: "GBP",
    status: "Pending",
  },
  {
    id: "AA1449",
    dueDate: new Date("2021-10-14"),
    clientName: "Mellisa Clarke",
    amount: 4032.33,
    currency: "GBP",
    status: "Pending",
  },
  {
    id: "TY9141",
    dueDate: new Date("2021-10-31"),
    clientName: "Thomas Wayne",
    amount: 6155.91,
    currency: "GBP",
    status: "Pending",
  },
  {
    id: "FV2353",
    dueDate: new Date("2021-11-12"),
    clientName: "Anita Wainwright",
    amount: 3102.04,
    currency: "GBP",
    status: "Draft",
  },
  // {
  //   id: "XM9141",
  //   dueDate: new Date("2021-09-20"),
  //   clientName: "Alex Grim",
  //   amount: 556.0,
  //   currency: "GBP",
  //   status: "Pending",
  // },
  // {
  //   id: "RG0314",
  //   dueDate: new Date("2021-10-01"),
  //   clientName: "John Morrison",
  //   amount: 14002.33,
  //   currency: "GBP",
  //   status: "Paid",
  // },
  // {
  //   id: "RT2080",
  //   dueDate: new Date("2021-10-12"),
  //   clientName: "Alysa Werner",
  //   amount: 102.04,
  //   currency: "GBP",
  //   status: "Pending",
  // },
  // {
  //   id: "AA1449",
  //   dueDate: new Date("2021-10-14"),
  //   clientName: "Mellisa Clarke",
  //   amount: 4032.33,
  //   currency: "GBP",
  //   status: "Pending",
  // },
  // {
  //   id: "TY9141",
  //   dueDate: new Date("2021-10-31"),
  //   clientName: "Thomas Wayne",
  //   amount: 6155.91,
  //   currency: "GBP",
  //   status: "Pending",
  // },
];

export default invoices;
