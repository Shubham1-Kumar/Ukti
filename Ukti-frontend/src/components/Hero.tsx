import { StartReadingButton } from "./StartReadingButton";
import { StartWritingButton } from "./StartWriting";
import hero_img from "../assets/hero-img-5(1).png";

export const UktiHero = () => {
  return (
    <section className="bg-[#f9f6f1] w-full pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Column */}
        <div className="flex flex-col w-full max-w-[700px] text-left">
          <h1 className="mb-12 text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] xl:text-[96px] leading-[1] font-serif font-semibold text-black">
            <div className="whitespace-nowrap">Ink your ideas</div>
            <div className="whitespace-nowrap">Shape the world</div>
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-gray-800">
            A place to read, write, and deepen your understanding.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <StartWritingButton />
            <StartReadingButton />
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full flex justify-center md:justify-end max-w-[400px]">
          <img
            src={hero_img}
            alt="Writing illustration"
            className="w-full max-w-[400px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};
