import { VscGithubAlt, VscRobot } from "react-icons/vsc";
import {
  PiFacebookLogo,
  PiGithubLogo,
  PiLinkedinLogo,
  PiWhatsappLogo,
} from "react-icons/pi";
import { TbLoader3 } from "react-icons/tb";
import Dialog from "./components/dialog";
import { useState } from "react";
import { RiRobot2Line } from "react-icons/ri";

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({
    is_spam: false,
    mail: "",
    message: "",
    predict: 0,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const URL = "https://mailspamchecker.pythonanywhere.com/check";
      // const URL = "http://localhost:5000/check";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail: inputContent }),
      });
      setResponse(await response.json());
      setShowDialog(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setInputContent("");
    }
  };

  // useEffect(() => {
  //   fetch("https://api.github.com/repos/huzzathasan/spam-mail-checker")
  //     .then((v) => {
  //       console.log(v.json());
  //     })
  //     .catch((r) => console.error(r));
  // }, []);

  return (
    <main className="w-full h-full min-h-dvh max-h-screen flex items-center justify-center relative">
      <a
        href="https://github.com/huzzathasan/spam-mail-checker.git"
        target="_blank"
        className="absolute top-3 right-3 flex items-center gap-2 bg-blue-50 border border-gray-500 py-1 px-2 rounded-md"
      >
        <VscGithubAlt className="text-black font-bold" />
        <p className="font-semibold">1.2K</p>
      </a>

      <div className="h-full max-h-screen w-[95%] md:w-3/4 lg:w-1/2 border-dashed border-[#302ebd] border rounded-md shadow-md bg-white drop-shadow-md">
        <div className="p-3 w-full flex items-center justify-center flex-col">
          <VscRobot className="w-16 h-16 animate-bounce text-indigo-400" />
          <h2 className="font-bold text-2xl text-blue-500">AI Spam Shield</h2>
        </div>
        <hr className="text-neutral-300 h-[0.5px]" />
        <div className="p-3 space-y-3">
          <textarea
            name=""
            id=""
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            className="resize-none w-full h-36 rounded-lg border border-blue-300 p-3 text-lg transition-all ease-in focus:outline-none focus:border-[#6366f1] focus:shadow-md placeholder:text-[#64748b]"
            placeholder="Enter your email content to analyze..."
          />
          <button
            className="w-full p-3 bg-blue-400 text-white border-none rounded-md text-lg font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
            onClick={handleSubmit}
            disabled={inputContent.trim() === ""}
          >
            {loading ? (
              <>
                <TbLoader3 className="animate-spin" />
                <p>Analyzing</p>
              </>
            ) : (
              <>
                <RiRobot2Line />
                <p>Analyze for Spam</p>
              </>
            )}
          </button>
          {error.trim() === " " && <p>Error</p>}
        </div>
        <hr className="text-neutral-300 h-[0.5px]" />
        <div className="p-3 space-y-2">
          <p className="text-center text-base font-semibold text-neutral-600">
            Powered by Advance Machine Learning | Secured by AI
            <br />
            <a
              href="https://www.portfolio-mehedi-hasan.vercel.app"
              className="text-center"
            >
              Created by{" "}
              <span className="underline text-indigo-500 cursor-pointer">
                Mehedi Hasan
              </span>
            </a>
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/huzzat77"
              target="_blank"
              className="bg-indigo-100 p-1 rounded-lg hover:animate-pulse"
            >
              <PiFacebookLogo className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/8801310289950"
              target="_blank"
              className="bg-indigo-100 p-1 rounded-lg hover:animate-pulse"
            >
              <PiWhatsappLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/huzzathasan"
              target="_blank"
              className="bg-indigo-100 p-1 rounded-lg hover:animate-pulse"
            >
              <PiLinkedinLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.github.com/huzzathasan"
              className="bg-indigo-50 p-1 rounded-lg hover:animate-pulse"
            >
              <PiGithubLogo className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      {showDialog && <Dialog data={response} setShowDialog={setShowDialog} />}
    </main>
  );
}

export default App;
