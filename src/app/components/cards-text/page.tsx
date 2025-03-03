import Image from "next/image";
import React from 'react';

// Define the interface for the CardText props
interface CardTextProps {
    title: string;
    description: string;
    tags: string[];
    isNewArrival: boolean;
    colours: string[];
    discountPercentage: number;
    careInstructions: string;
    availability: string;
    shippingInformation: string;
    specialOffers: string;
    productImage: string;
    price: number;
    discountPrice: number;
    _id: string;
   
}

const CardText: React.FC<CardTextProps> = ({ title, description, tags, isNewArrival, colours, discountPercentage, careInstructions, availability, shippingInformation, specialOffers }) => {
  return (
    <div className="w-[239px] h-[188px] py-[25px] px-[25px] flex flex-col items-center justify-center gap-[10px]">
      <div className="text-center mt-4">
        <h4 className="font-Montserrat font-bold text-[18px] text-[#252B42]">{title}</h4>
        <p className="font-Montserrat font-normal text-[14px] text-[#737373]">{description}</p>
      </div>
      <div className="w-full px-[3px] py-[5px] flex justify-center gap-[5px]">
        
        <h5 className="font-Montserrat font-bold text-[16px] leading-[24px] text-[#BDBDBD]">
          $16.48
        </h5>
        <h5 className="font-Montserrat font-bold text-[16px] leading-[24px] text-[#23856D]">
          $6.48
        </h5>
      </div>
      
      <div className="w-[82.2px] h-[16px] flex justify-center">
        <Image src="/pc.png" alt="women" width={1440} height={716} />
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm">{isNewArrival ? "New Arrival!" : ""}</p>
      <p className="text-sm">Colours: {Array.isArray(colours) ? colours.join(', ') : 'N/A'}</p>
      <p className="text-sm">Discount: {discountPercentage}%</p>
      <p className="text-sm">Care Instructions: {careInstructions}</p>
      <p className="text-sm">Availability: {availability}</p>
      <p className="text-sm">Shipping Info: {shippingInformation}</p>
      <p className="text-sm">Special Offers: {specialOffers}</p>
    </div>
  );
};

export default CardText;
