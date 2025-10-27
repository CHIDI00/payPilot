import { useMoveBack } from "@/hooks/useMoveBack";
import { ChevronLeft } from "lucide-react";

const GoBack = () => {
  const moveBack = useMoveBack();

  return (
    <div className="w-full mb-10 flex justify-between items-center">
      <h2 className="text-[2rem] font-medium">Account</h2>
      <button
        className="flex justify-between items-center md:gap-7 gap-2 md:text-[1.7rem] text-[1.5rem]"
        onClick={moveBack}
      >
        <span>
          <ChevronLeft size={18} />
        </span>
        Go back
      </button>
    </div>
  );
};

export default GoBack;
