import Lottie from "react-lottie";
import MissingLottie from "../lottie/missing.json";
import Link from "next/link";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: MissingLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const MovieMissing = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen mx-auto">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full max-w-[300px]">
          <Lottie
            options={defaultOptions}
            height={"100%"}
            width={"100%"}
            isClickToPauseDisabled
          />
        </div>
        <h1 className="px-10 mb-10 text-center lg:text-4xl">
          The show you are looking for doesn't exist
        </h1>

        <Link
          className="flex items-center gap-4 px-3 py-2 bg-gray-200 rounded-full"
          href="/">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24">
              <path d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z"></path>
              <path d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z"></path>
            </svg>
          </span>
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};
