import Button from "@/ui/Button";
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="max-w-[160rem] mx-auto px-5 lg:px-20 py-14">
      <div className="relative w-full py-24 overflow-hidden lg:py-56 lg:px-0">
        {/* Your content sits here, on top */}
        <div className="flex flex-col items-center text-black">
          <h2 className="mb-16 text-6xl font-bold text-center lg:text-8xl md:mb-10">
            Innovate with PayPilot
          </h2>
          <p className="mb-10 text-3xl text-left md:max-w-5xl md:text-center opacity-90">
            PayPilot empowers businesses and freelancers to create, send, and
            manage invoices with ease from anywhere, on any device. Spend less
            time on paperwork and more time growing your business with automated
            reminders, real-time finance tracking, and beautiful branded PDFs.
            Whether you’re a solo founder or a growing company, PayPilot makes
            invoicing, payments, and financial monitoring effortless and secure,
            all from one cloud dashboard.
          </p>
          <div className="flex flex-col items-center w-full gap-4 mb-16 sm:flex-row">
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
                  className="md:w-[20rem] w-full flex justify-center items-center gap-10 text-[1.6rem] transition-all duration-300 hover:scale-105 my-10"
                >
                  Try PayPilot Now
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-full relative bg-[#451f9e] rounded-3xl mt-0 md:px-28 md:py-24 p-8 text-white max-w-[98vw] mx-auto shadow-lg">
        <span className="absolute w-4 h-4 bg-white rounded-full right-6 top-6"></span>

        <div className="flex flex-col items-start justify-between gap-10">
          <div className="flex items-start justify-between w-full mb-32">
            <span className="text-5xl font-bold md:text-6xl">PayPilot</span>
          </div>
          <div className="grid grid-cols-2 mb-32 md:grid-cols-4 gap-x-44 gap-y-16">
            <div>
              <p className="mb-3 text-3xl font-semibold">Product</p>{" "}
              <ul className="flex flex-col gap-4 text-2xl text-gray-200 md:text-2xl">
                <Link to="#">
                  <li>Features</li>
                </Link>
                <Link to="#">
                  <li>Pricing</li>
                </Link>
                <Link to="#">
                  <li>Docs</li>
                </Link>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-3xl font-semibold">Company</p>
              <ul className="flex flex-col gap-4 text-2xl text-gray-200 md:text-2xl">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold tex3-3xl">Legal</p>
              <ul className="flex flex-col gap-4 text-2xl text-gray-200 md:text-2xl">
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-3xl font-semibold">Contact</p>
              <ul className="flex flex-col gap-4 text-2xl text-gray-200 md:text-2xl">
                <li>Email</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>

          <p className="max-w-lg mt-10 text-gray-100">
            Empowering your finances with instant invoicing, real-time
            monitoring, and seamless workflow.
          </p>

          <div className="w-full border-t-[1px] border-gray-400 pt-14 flex justify-between items-center">
            <div className="flex gap-2">
              <p>Buy me a coffee </p> <Coffee size={18} />
            </div>

            <p>All Rights Reserved &copy; 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
