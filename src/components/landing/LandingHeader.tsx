import { Link } from "react-router-dom";
import { WalletMinimal } from "lucide-react";
import Button from "../../ui/Button";

export default function LandingHeader() {
  return (
    <header className="fixed z-[10] top-0 left-0 w-full px-6 py-6 md:px-12 lg:px-20 bg-[#ffffff51] backdrop-blur-xl">
      <nav className="max-w-[160rem] mx-auto flex items-center justify-between">
        <div className="flex justify-center items-center gap-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7C5DFA] to-[#9277FF] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <WalletMinimal size={24} color="white" />
            </div>
            <span className="text-[2.4rem] font-bold text-[#1a1a1a] tracking-tight">
              PayPilot
            </span>
          </Link>

          <div className="items-center hidden gap-8 md:flex">
            <Link
              to="/"
              className="text-[1.6rem] font-medium text-[#4a4a4a] hover:text-[#7C5DFA] transition-colors duration-200"
            >
              Support
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <Link to="/auth/login">
            <Button variant="light" size="md" className="hidden sm:flex">
              Sign In
            </Button>
          </Link> */}
          <Link to="/auth/signup">
            <Button variant="primary" size="md" className="md:px-16">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
