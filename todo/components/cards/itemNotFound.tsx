import Lottie from "lottie-react";

import lottieNotFound from "../../public/lotties/lottieNotFound.json";

export default function ItemNotFound() {
  return (
    <Lottie className="h-80 w-80" animationData={lottieNotFound} loop={true} />
  );
}
