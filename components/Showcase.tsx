import Image from "next/image";

type Props = {
  images: { src: string; alt: string }[];
};

const Showcase: React.FC<Props> = ({ images }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white space-x-16 rounded-xl mx-auto ">
      {/* Left Side: Quote and Button */}
      <div className="md:w-1/3 text-center md:text-left mb-8 md:mb-0 sel">
        <h2 className="text-3xl font-semibold text-gray-800">
          Embrace the Art of Kashmir –
          <br />
          <span className="text-xl font-light">
            Where Every Stitch Tells a Story
          </span>
        </h2>
        <button className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-700">
          Shop Now
        </button>
      </div>

      {/* Right Side: Image Grid */}
      <div className="md:w-2/3 grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg scale-100 hover:scale-105 transition duration-300"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
