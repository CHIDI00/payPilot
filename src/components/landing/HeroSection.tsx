import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full  flex flex-col justify-center items-center px-10 pt-60 pb-24 md:px-12 lg:px-20 md:pt-60 md:pb-40">
      <div className="flex flex-col items-center text-center max-w-[120rem] mx-auto">
        {/* Main Hero Content */}

        {/* Main Heading */}
        <h1 className="text-[4.4rem] md:text-[6.5rem] lg:text-[12rem] font-semibold md:leading-[1.1] mb-8 text-[#0a0a0a] md:text-center text-left md:tracking-tight">
          Send invoices, get
          <br />
          <span className="">
            paid.{" "}
            <span className="bg-gradient-to-r from-[#7C5DFA] via-[#9277FF] to-[#a78bfa] bg-clip-text text-transparent">
              Fast.
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-[2.3rem] md:text-[2rem] md:leading-relaxed leading-tight text-[#4a4a4a] mb-12 max-w-[400px] font-medium md:text-center text-left">
          Create, send, and automate invoices in the cloud. Secure, branded, and
          easy to use for freelancers, businesses and companies..
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center w-full gap-4 mb-16 sm:flex-row">
          <Link
            to="/auth/signup"
            className="flex items-center justify-center w-full"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="primary"
                size="md"
                className="md:w-[20rem] w-full flex justify-center items-center gap-10 text-[1.6rem] transition-all duration-300 hover:scale-105"
              >
                Try PayPilot
                {/* <ArrowRight size={20} className="" /> */}
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Visual Element - Floating Cards */}
      {/* <div className="relative mt-20 md:mt-28">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#7C5DFA]/5 to-transparent blur-3xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
            <FloatingCard
              delay="0s"
              title="Create"
              description="Design beautiful invoices in minutes"
              gradient="from-[#7C5DFA]/10 to-[#9277FF]/10"
            />
            <FloatingCard
              delay="0.2s"
              title="Send"
              description="Deliver to clients instantly"
              gradient="from-[#9277FF]/10 to-[#a78bfa]/10"
            />
            <FloatingCard
              delay="0.4s"
              title="Track"
              description="Monitor payments in real-time"
              gradient="from-[#a78bfa]/10 to-[#c4b5fd]/10"
            />
          </div>
        </div> */}
      {/* </div> */}
    </section>
  );
}

// function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
//   return (
//     <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm bg-white/70 backdrop-blur-sm border-gray-200/50">
//       <span className="text-[#7C5DFA]">{icon}</span>
//       <span className="text-[1.3rem] font-medium text-[#4a4a4a]">{text}</span>
//     </div>
//   );
// }

// function FloatingCard({
//   delay,
//   title,
//   description,
//   gradient,
// }: {
//   delay: string;
//   title: string;
//   description: string;
//   gradient: string;
// }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
//       style={{ animationDelay: delay }}
//     >
//       <h3 className="text-[2.4rem] font-bold text-[#1a1a1a] mb-3">{title}</h3>
//       <p className="text-[1.5rem] text-[#4a4a4a] leading-relaxed">
//         {description}
//       </p>
//     </div>
//   );
// }

{
  /* Badge */
}
{
  /* <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-[#7C5DFA]/20 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Sparkles size={16} className="text-[#7C5DFA]" />
            <span className="text-[1.3rem] font-semibold text-[#7C5DFA]">
              Trusted by 10,000+ freelancers
            </span>
          </div> */
}
