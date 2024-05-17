import Lottie from "react-lottie";
import LoadingLottie from "../lottie/loading.json";

export const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center mb-10">
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
        isClickToPauseDisabled
      />
      <p className="text-2xl -mt-10">Loading</p>
    </div>
  );
};
