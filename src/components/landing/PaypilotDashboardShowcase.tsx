import { useEffect, useState } from "react";
import bigscreen from "../../assets/Screenshot (218).png";
import mobileView from "../../assets/paypilot_mobile_withframe.png";
import { motion, useScroll, useTransform } from "framer-motion";

const PaypilotDashboardShowcase = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); // Adjust for your breakpoint
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set parallax strength depending on screen size
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, -40] : [0, -200]
  );

  // const x = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section className="w-full lg:px-20 px-10 py-14 ">
      <div className="relative w-full max-w-[160rem] mx-auto">
        <div className="w-full lg:px-20 aspect-video rounded-xl">
          <motion.img
            src={bigscreen}
            alt="dashboard"
            className="rounded-xl"
            // style={{ x }}
          />
        </div>
        <div
          className="
    absolute 
    lg:-right-14 right-5 lg:top-10 top-[50%] 
    lg:w-[40rem] md:w-[20rem] w-[10rem]
    lg:translate-y-0 translate-y-[-50%]
    lg:px-16 lg:py-40
    px-4 py-8
    rounded-xl
  "
        >
          <motion.img
            src={mobileView}
            alt=""
            className="w-full drop-shadow-2xl"
            style={{ y }}
          />
        </div>
      </div>
    </section>
  );
};

export default PaypilotDashboardShowcase;
