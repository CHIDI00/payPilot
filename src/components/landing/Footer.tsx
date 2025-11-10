import Button from "@/ui/Button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full lg:px-20 px-5 py-14">
      <div className="relative w-full py-24 lg:py-56  lg:px-0 overflow-hidden">
        {/* Your content sits here, on top */}
        <div className="flex flex-col items-center text-black">
          <h2 className="font-bold text-6xl lg:text-8xl md:mb-10 mb-16 text-center">
            Innovate with PayPilot
          </h2>
          <p className="md:max-w-5xl text-3xl md:text-center text-left mb-10 opacity-90">
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
              <Button
                variant="primary"
                size="md"
                className="md:w-[20rem] w-full flex justify-center items-center gap-10 text-[1.6rem] transition-all duration-300 hover:scale-105 my-10"
              >
                Try PayPilot Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-full relative bg-[#451f9e] rounded-3xl mt-0 md:px-28 md:py-24 p-8 text-white max-w-[98vw] mx-auto shadow-lg">
        <span className="w-4 h-4 absolute right-6 top-6 rounded-full bg-white"></span>

        <div className="flex flex-col  justify-between gap-10 items-start">
          <div className="mb-32 flex justify-between items-start w-full">
            <span className="font-bold md:text-6xl text-5xl">PayPilot</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-44 gap-y-16 mb-32">
            <div>
              <p className="mb-3 font-semibold text-3xl">Product</p>{" "}
              <ul
                className="md:text-2xl
text-2xl text-gray-200 flex flex-col gap-4"
              >
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
              <p className="mb-3 font-semibold text-3xl">Company</p>
              <ul className="md:text-2xl text-2xl text-gray-200 flex flex-col gap-4">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold tex3-3xl">Legal</p>
              <ul className="md:text-2xl text-2xl text-gray-200 flex flex-col gap-4">
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-3xl">Contact</p>
              <ul className="md:text-2xl text-2xl text-gray-200 flex flex-col gap-4">
                <li>Email</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-gray-100 max-w-lg">
            Empowering your finances with instant invoicing, real-time
            monitoring, and seamless workflow.
          </p>

          <div className="w-full border-t-[1px] border-gray-400 pt-14 flex justify-between items-center">
            <p>Buy me a coffee</p>

            <p>All Rights Reserved &copy; 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
