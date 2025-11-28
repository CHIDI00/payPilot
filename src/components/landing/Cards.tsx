import { Receipt } from "lucide-react";

const features = [
  {
    title: "Branded PDF Export",
    description:
      "Create professional, custom-branded invoices that you can send as PDFs.",
  },
  {
    title: "Monitor Your Finance",
    description:
      "Track all invoices, payments, and outstanding balances in real time for complete visibility into your cash flow.",
  },
  {
    title: "Automated Payment Reminders",
    description:
      "Never chase payments again. PayPilot automatically sends gentle reminders to clients, increasing your chance of getting paid on time.",
  },
  {
    title: "Access Anywhere, Anytime",
    description:
      "Manage and send invoices effortlessly from your desktop, tablet, or phone—your financial workflow goes wherever you go.",
  },
];

const Cards = () => {
  return (
    <section className="w-full lg:px-40 px-10 py-14">
      <div className="w-full max-w-[160rem] mx-auto">
        <div className="w-full flex justify-center items-center mb-6">
          <h2 className="lg:text-[4.5rem] text-[3rem] leading-tight md:text-center text-left  font-semibold">
            Your entire financial workflow simplified
          </h2>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col w-full h-full px-10 py-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <Receipt size={28} className="mb-4 text-purple-600" />
              <p className="font-bold text-4xl mb-2">{feature.title}</p>
              <p className="text-2xl text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
