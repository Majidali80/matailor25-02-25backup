import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Background Image */}
      <div className="w-full h-full">
        <Image
          src="/hero5.png"
          alt="hero image"
          width={1440}
          height={852}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-8 md:px-12 lg:px-24 gap-6 sm:gap-8 md:gap-10 z-10">
        {/* Small Text */}
        <h5 className="font-Montserrat font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-white tracking-wide">
          {/* You can add content here */}
        </h5>

        {/* Main Title */}
        <h1 className="font-Montserrat font-bold text-[32px] sm:text-[36px] md:text-[48px] lg:text-[58px] leading-tight text-white max-w-[90%] sm:max-w-[80%] md:max-w-[600px]">
          {/* You can add content here */}
        </h1>

        {/* Subtitle */}
        <h4 className="font-Montserrat font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-normal text-[#FAFAFA] max-w-[90%] sm:max-w-[80%] md:max-w-[500px] mt-32">
          {/* You can add content here */}
        </h4>

        {/* Call to Action Button */}
        <a href="/product" className="w-[160px] sm:w-[180px] md:w-[200px] lg:w-[221px] h-[50px] sm:h-[56px] md:h-[62px] lg:h-[70px] rounded-[5px] bg-yellow-400 text-black text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] font-Montserrat">
          <button className="w-full h-full">
            SHOP NOW
          </button>
        </a>
      </div>
    </div>
  );
}
