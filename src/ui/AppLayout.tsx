import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
// import Modal from "./Modal";
// import CreateInvoiceForm from "../features/invoice/CreateInvoiceForm";

const AppLayout: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const onClose = () => setIsModalOpen(false);

  return (
    <div className="w-screen h-screen bg-primary-bg flex lg:flex-row flex-col justify-start items-start ">
      <div className="lg:w-[5.5%] w-full bg-[#252945] lg:h-full md:h-[7%] h-[7.5%] lg:rounded-tr-[2.5rem] lg:rounded-br-[2.5rem]">
        <SideBar />
      </div>
      <main className="relative w-full h-full overflow-y-scroll">
        <div className="max-w-[85rem] mx-auto my-0 ">
          <Outlet />
        </div>

        {/* {isModalOpen && (
          <Modal onClose={onClose} isModalOpen={isModalOpen}>
            <CreateInvoiceForm onCloseModal={onClose} />
          </Modal>
        )} */}
      </main>
    </div>
  );
};

export default AppLayout;
