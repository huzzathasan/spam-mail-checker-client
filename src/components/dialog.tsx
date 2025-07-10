import { MdClose } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { RiSpamFill } from "react-icons/ri";

type Response = {
  is_spam: boolean;
  mail: string;
  message: string;
  predict: number;
};

function Dialog({
  data,
  setShowDialog,
}: {
  data: Response;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { is_spam, mail, message } = data;
  function handleCloseModel() {
    setShowDialog(false);
  }
  return (
    <div
      className="transition-all absolute inset-0 w-full h-full bg-black/40 flex justify-center items-center"
      onTouchEnd={handleCloseModel}
      onClick={handleCloseModel}
    >
      <div className="w-[95%] md:h-2/3 lg:w-2/5 py-4 bg-white rounded-md relative flex items-center justify-center flex-col gap-3">
        <button
          onClick={handleCloseModel}
          className="absolute top-0 right-0 bg-red-600 rounded-bl-md rounded-tr-md cursor-pointer z-10"
        >
          <MdClose className="w-8 h-8 text-white" />
        </button>

        <div className="flex items-center flex-col">
          {is_spam ? (
            <RiSpamFill className="w-12 h-12 text-red-400" />
          ) : (
            <AiOutlineSafety className="w-12 h-12 text-green-400" />
          )}

          <h1
            className={`text-center text-2xl font-semibold uppercase ${
              is_spam ? "text-red-600" : "text-green-600"
            }`}
          >
            {is_spam ? "Spam Detected" : "No Spam Detect"}
          </h1>
        </div>
        <div className="space-y-2">
          <p className="text-center text-sm border border-dashed">
            {mail.slice(0, 40)}
            {mail.length > 30 && "..."}
          </p>
          <p className="text-lg font-semibold text-black/75">{message}</p>

          {/* <span className="flex items-center justify-center bg-green-300 rounded-full p-2 gap-3">
            <MdTrendingUp />
            <p className="font-semibold"> {predict} Confidence</p>
          </span>
           */}
        </div>
      </div>
    </div>
  );
}

export default Dialog;
