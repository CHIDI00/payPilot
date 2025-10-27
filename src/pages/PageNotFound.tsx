import Button from "@/ui/Button";
import pageNotFound from "../assets/pagenotfound.png";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-full bg-white flex flex-col justify-center items-center">
      <img src={pageNotFound} alt="" className="lg:w-[40%] w-[100%]" />
      <Button onClick={() => navigate("/invoices")}>Back Home</Button>
    </div>
  );
};

export default PageNotFound;
