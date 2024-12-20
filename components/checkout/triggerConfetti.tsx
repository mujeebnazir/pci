import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
const Confetti = () => {
  const [showCheck, setShowCheck] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheck(true);
    }, 300);

    const duration = 3000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;

      // Left side confetti
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0,
        ticks: 300,
      });

      // Right side confetti
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        drift: 0,
        ticks: 300,
      });

      requestAnimationFrame(frame);
    };

    frame();

    return () => {
      clearTimeout(timer);
      confetti.reset();
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ease-out scale-100">
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`transform transition-all duration-500 ${
              showCheck ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <div className="bg-black rounded-full p-2">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-black mt-4">
            Order Confirmed
          </h1>

          <p className="text-gray-600 text-center">
            Thank you for your purchase! You will receive an email confirmation
            shortly.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confetti;
