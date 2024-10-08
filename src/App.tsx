import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import Form from "./Form";

function App() {
  const [typingComplete, setTypingComplete] = useState(false);

  const showAnimationClass = `${typingComplete ? "opacity-100" : "scale-110 md:scale-150 opacity-0"} block transition-all duration-700 ease-in-out`;

  return (
    <>
      <div className="absolute inset-0 h-full w-full bg-gray-900/60"></div>
      <div className="grid min-h-screen px-1">
        <div className="container relative z-10 mx-auto my-auto grid place-items-center text-center">
          <h3 className="mb-2 block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            <span className="invisible">i</span>
            <TypeAnimation
              sequence={["Saturday October 26th, 2024"]}
              cursor={false}
            ></TypeAnimation>
          </h3>
          <h1 className="mb-2 block text-7xl leading-none tracking-normal text-red-700 antialiased transition-all duration-300 lg:max-w-3xl">
            <span className={showAnimationClass}>Spookfest</span>
            <span
              className={
                showAnimationClass + " text-5xl leading-none delay-75 "
              }
            >
              on
            </span>
            <span className={showAnimationClass + " delay-150"}>Sunridge</span>
          </h1>
          <p className="mb-12 block w-full font-sans text-xl font-normal leading-relaxed text-white antialiased md:max-w-full lg:max-w-2xl">
            <span className="invisible">i</span>
            <TypeAnimation
              sequence={[
                2000,
                "Join us for the most anticipated event of the year",
                1000,
                () => setTypingComplete(true),
              ]}
              cursor={false}
            ></TypeAnimation>
          </p>
          <div
            className={`${showAnimationClass} flex justify-center space-x-4`}
          >
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
