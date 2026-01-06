import { useUser } from "@/features/authentication/useUser";
import { CheckCircle, MailCheck, SendHorizonal } from "lucide-react";

const SuccessfulSignupConfirmationScreen = () => {
  const { user } = useUser();
  return (
    <div className="w-screen h-[100dvh] flex justify-center items-center bg-purple-100">
      {/* <!-- Main Layout Container --> */}
      <div className="flex items-center justify-center flex-grow p-4 sm:p-8">
        {/* <!-- Central Card --> */}
        <main className="w-full max-w-[700px] bg-white dark:bg-[#191022] rounded-xl shadow-sm border border-[#e0dbe6] dark:border-white/10 overflow-hidden flex flex-col">
          {/* <!-- Hero Section --> */}
          <div className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-16">
            {/* <!-- Large Success Icon --> */}
            <div className="relative">
              <div className="flex items-center justify-center rounded-full size-20">
                <span
                  className="text-purple-500 "
                  data-icon="mark_email_unread"
                >
                  <MailCheck size={60} />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-7 max-w-[500px]">
              <h1 className="text-[#141118]  tracking-tight text-5xl sm:text-6xl font-bold leading-tight">
                Check your inbox
              </h1>
              <p className="text-[#756189] text-3xl sm:text-3xl font-normal leading-relaxed">
                We've sent a verification email to{" "}
                <span className="font-bold text-[#141118] dark:text-white">
                  {user?.email}
                </span>
                . Please click the link in the email to activate your account.
              </p>
            </div>
          </div>
          {/* <!-- Status Indicators Grid --> */}
          <div className="px-6 py-8 md:py-14 sm:px-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* <!-- Step 1: Account Created --> */}
              <div className="flex gap-4 rounded-lg border border-[#e0dbe6] bg-[#f2f7f1] p-4 items-start">
                <div className="mt-1 text-green-600">
                  <span className="">
                    <CheckCircle />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#141118] text-3xl font-medium leading-tight">
                    Account Created
                  </h2>
                  <p className="text-[#756189] text-[1.4rem] font-normal">
                    Your profile is setup.
                  </p>
                </div>
              </div>
              {/* <!-- Step 2: Verification Sent --> */}
              <div className="relative flex items-start gap-4 p-4 overflow-hidden border rounded-lg border-primary/30 bg-[#f6f1f7]">
                <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 rounded-bl-full bg-gradient-to-br from-primary/10 to-transparent"></div>
                <div className="mt-1 text-purple-600">
                  <span className="">
                    <SendHorizonal />
                  </span>
                </div>
                <div className="relative z-10 flex flex-col gap-1">
                  <h2 className="text-[#141118] text-3xl font-medium leading-tight">
                    Verification Sent
                  </h2>
                  <p className="text-[#756189] text-[1.4rem] font-normal">
                    Link sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Action Area --> */}
          {/* <div className="bg-[#fbfafc] dark:bg-[#1e1427] border-t border-[#e0dbe6] dark:border-white/10 p-6 sm:p-10 flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[560px]">
              <button className="flex-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-sm hover:shadow-md">
                <span className="truncate">Go to Dashboard</span>
              </button>
              <button className="flex-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white dark:bg-transparent border border-[#e0dbe6] dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 text-[#141118] dark:text-white text-base font-bold leading-normal tracking-[0.015em] transition-all">
                <span className="truncate">Resend Email</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#756189] dark:text-gray-500">
              <span className="material-symbols-outlined text-[18px]">
                info
              </span>
              <p>Didn't receive it? Check your spam folder.</p>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default SuccessfulSignupConfirmationScreen;
