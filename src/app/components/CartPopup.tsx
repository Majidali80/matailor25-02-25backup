import React from 'react';
import Link from 'next/link';

interface CartPopupProps {
    item: {
        name: string;
        price: number;
        customization?: {
            designType: string;
            fabricType: string;
            measurements?: {
                chest: number;
                waist: number;
                hips: number;
                length?: number;
            shoulder?: number;
            armHole?: number;
            sleeves?: number;
            cuff?: number;
            frontNeck?: number;
            backNeck?: number;
            neckDeep?: number;
            chak?: number;
            daman?: number;
            };
            
            trouserSizes?: { size: string; length: number; waist: number; hips: number; pancha: number; elastic: boolean; }[];
            uploadDesign?: File[];
            additionalNotes?: string;
            sout?: boolean;
            length?: number;
            shoulder?: number;
            armHole?: number;
            sleeves?: number;
            cuff?: number;
            frontNeck?: number;
            backNeck?: number;
            neckDeep?: number;
            chak?: number;
            daman?: number;
        };
    };
    onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ item, onClose }) => {
    // Debugging: Add a console log to check shirt sizes data
   

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-orange-200 shadow-lg rounded-lg w-96 border border-gray-300">
                <div className="flex justify-between p-4">
                    <h1 className="text-xl font-bold">Item Added to Cart</h1>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        &times;
                    </button>
                </div>
                <div className="p-6 max-h-[400px] overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                    <table className="min-w-full border-collapse border border-gray-300 mb-4">
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 font-medium">Name:</td>
                                <td className="border border-gray-300 p-2">{item.name}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-medium">Price:</td>
                                <td className="border border-gray-300 p-2">PKR {item.price.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    {item.customization && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Customization Details:</h2>
                            <table className="min-w-full border-collapse border border-gray-300 mb-4">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Design Type:</td>
                                        <td className="border border-gray-300 p-2">{item.customization.designType}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-medium">Fabric Type:</td>
                                        <td className="border border-gray-300 p-2">{item.customization.fabricType}</td>
                                    </tr>
                                    {/* Display Measurements */}
                                    {item.customization.measurements && (
                                        <>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Chest:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.chest}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Waist:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.waist}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Hips:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.hips}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Length:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.length}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Arm Hole:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.armHole}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Shoulder:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.shoulder}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Daman:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.daman}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Sleeves:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.sleeves}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Cuff:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.cuff}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Front Neck:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.frontNeck}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Back Neck:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.backNeck}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Neck Deep:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.neckDeep}</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-300 p-2 font-medium">Chak:</td>
                                                <td className="border border-gray-300 p-2">{item.customization.measurements.chak}</td>
                                            </tr>
                                        </>
                                    )}
                                    
                                    {/* Display Trouser Sizes */}
                                    {item.customization.trouserSizes && item.customization.trouserSizes.length > 0 && (
                                        <tr>
                                            <td className="border border-gray-300 p-2 font-medium">Trouser Sizes:</td>
                                            <td className="border border-gray-300 p-2">
                                                {item.customization.trouserSizes.map((size, index) => (
                                                    <div key={index}>
                                                        {`Size: ${size.size}, Length: ${size.length}, Waist: ${size.waist}, Hips: ${size.hips}, Pancha: ${size.pancha}`}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Display Uploaded Design */}
                            {item.customization.uploadDesign && item.customization.uploadDesign.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Uploaded Design:</h2>
                                    <img
                                        src={URL.createObjectURL(item.customization.uploadDesign[0])}
                                        alt="Uploaded Design"
                                        className="w-full h-auto rounded"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* View Cart Button */}
                <div className="flex justify-center mt-4">
                    <Link href="/cart">
                        <button onClick={onClose} className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500">
                            View Cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPopup;
