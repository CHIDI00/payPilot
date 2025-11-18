import React from "react";
import invoiceIcon from "../../assets/invoiceIcon.png";
import clients from "../../assets/clients.png";
import { SquaresExclude, Users } from "lucide-react";
import type { Invoice } from "../../utils/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/helper";
import { useInvoiceOnDashboard } from "../invoice/useInvoiceOnDashboard";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function makeMonthCounts(invoices: Invoice[] = []) {
  // totals (amounts) per month
  const paid = new Array(12).fill(0);
  const pending = new Array(12).fill(0);

  invoices.forEach((inv) => {
    const status = (inv.status || "").toLowerCase();
    const dateStr = inv.invoice_date || inv.created_at || null;
    const date = dateStr ? new Date(dateStr) : null;
    const idx = date && !isNaN(date.getTime()) ? date.getMonth() : 0;

    const invoiceTotal =
      inv.items?.reduce((acc, it) => acc + it.quantity * it.price, 0) || 0;

    if (status === "paid") paid[idx] += invoiceTotal;
    if (status === "pending") pending[idx] += invoiceTotal;
  });

  return months.map((m, i) => ({
    month: m,
    Invoice: pending[i],
    Receipt: paid[i],
  }));
}

const InvoiceChart: React.FC = () => {
  const { invoices } = useInvoiceOnDashboard();
  const chartData = makeMonthCounts(invoices || []);

  const paidCount = (invoices || []).filter(
    (inv) => (inv.status || "").toString().toLowerCase() === "paid"
  ).length;
  const pendingCount = (invoices || []).filter(
    (inv) => (inv.status || "").toString().toLowerCase() === "pending"
  ).length;
  const draftCount = (invoices || []).filter(
    (inv) => (inv.status || "").toString().toLowerCase() === "draft"
  ).length;

  return (
    <div className="grid items-start justify-between grid-cols-1 lg:grid-cols-3 md:gap-x-5 gap-y-5">
      {/* Chart */}
      <div className="col-span-2 p-10 bg-white rounded-3xl md:h-[45rem] h-[35rem] ">
        <h3 className="mb-2 text-4xl font-bold text-black">Monthly Overview</h3>
        <div className="w-full h-full overflow-x-scroll">
          <ResponsiveContainer
            width={window.innerWidth < 500 ? 600 : "100%"}
            height="100%"
          >
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e6eef6" />
              <XAxis tick={{ fontSize: 12 }} interval={0} dataKey="month" />
              <YAxis
                tick={{ fontSize: 12 }}
                tickCount={8}
                allowDecimals={false}
                tickFormatter={(v) => formatCurrency(Number(v))}
              />
              <Tooltip
                wrapperStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  color: "#222",
                  boxShadow: "0 4px 8px #0001",
                  borderRadius: 6,
                  padding: 10,
                  fontSize: 16,
                }}
                formatter={(value: number) => formatCurrency(Number(value))}
              />
              <Legend />
              <Bar dataKey="Invoice" fill="#9277ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Receipt" fill="#5b3cd5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col w-full gap-5 lg:flex-col md:flex-row">
        <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
          <div className="flex flex-col items-start justify-center gap-7">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white bg-purple-600 rounded-full">
              <SquaresExclude size={15} />
            </span>

            <div className="flex flex-col items-start justify-start gap-2 my-10">
              <p className="font-bold ">Total Invoice</p>
              <p className="text-4xl font-extrabold">{invoices?.length}</p>
            </div>

            <div className="flex gap-7">
              <div className="flex flex-col items-center justify-start gap-1">
                <p className="text-xl font-medium text-black">Paid</p>
                <p className="text-4xl font-bold text-black">{paidCount}</p>
              </div>
              <div className="flex flex-col items-center justify-start gap-1">
                <p className="text-xl font-medium text-black">Pending</p>
                <p className="text-4xl font-bold text-black">{pendingCount}</p>
              </div>
              <div className="flex flex-col items-center justify-start gap-1">
                <p className="text-xl font-medium text-black">Draft</p>
                <p className="text-4xl font-bold text-black">{draftCount}</p>
              </div>
            </div>
          </div>
          <div className="">
            <img src={invoiceIcon} alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full p-5 bg-white rounded-3xl">
          <div className="flex flex-col items-start justify-center gap-32">
            <span className="flex items-center justify-center w-12 h-12 p-2 text-white rounded-full bg-slate-600">
              <Users size={15} />
            </span>

            <div className="flex flex-col items-start justify-start gap-2 ">
              <p className="font-bold ">Total Clients</p>
              <p className="text-6xl font-extrabold">32</p>
            </div>
          </div>
          <div className="">
            <img src={clients} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceChart;
