// app/not-found.js
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <div className="text-center">
        {/* Image or Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image
            src="/images/404-image.png"  // Replace with your own 404 image or illustration in black and white
            alt="404 - Page Not Found"
            layout="fill"
            objectFit="contain"
          />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl font-bold mb-4">
          Oops! Page Not Found
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl font-light mb-6">
          We couldn't find the page you're looking for. But don't worry, we've got plenty of awesome products for you!
        </p>
        
        {/* Redirect to Home */}
        <Link href="/" passHref>
          <button className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all">
            Go to Homepage
          </button>
        </Link>

        {/* Alternatively, you can add more helpful links */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Browse Our Categories</h3>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/category/shawls" passHref>
              <button className="text-black hover:underline">Shawls</button>
            </Link>
            <Link href="/category/pashmina" passHref>
              <button className="text-black hover:underline">Pashmina</button>
            </Link>
            <Link href="/category/robes" passHref>
              <button className="text-black hover:underline">Robes</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
