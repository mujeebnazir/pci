// app/not-found.js
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      <div className="text-center px-6">
        {/* Image or Illustration */}
        <div className="relative w-72 h-60 mx-auto mb-8">
          <Image
            src="/404.png"
            alt="404 - Page Not Found"
            layout="fill"
            objectFit="contain"
            className="rounded-lg drop-shadow-md"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-light text-gray-700 mb-6">
          It seems you've hit a dead end. But don&apos;t worry, we&apos;re here
          to help you find your way!
        </p>

        {/* Redirect to Home */}
        <div className="mb-8">
          <Link href="/" passHref>
            <button className="px-8 py-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-700 transition-all">
              Back to Homepage
            </button>
          </Link>
        </div>

        {/* Browse Categories */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Explore Our Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/shawls" passHref>
              <button className="px-4 py-2 bg-white text-gray-900 border border-gray-600 rounded-full hover:bg-gray-200 transition-all">
                Shawls
              </button>
            </Link>
            <Link href="/category/pashmina" passHref>
              <button className="px-4 py-2 bg-white text-gray-900 border border-gray-600 rounded-full hover:bg-gray-200 transition-all">
                Pashmina
              </button>
            </Link>
            <Link href="/category/robes" passHref>
              <button className="px-4 py-2 bg-white text-gray-900 border border-gray-600 rounded-full hover:bg-gray-200 transition-all">
                Robes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
