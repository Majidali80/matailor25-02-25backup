import React, { useState } from 'react';
import { CustomizationDetails } from '../types/customization';  

interface CustomizationFormProps {
    onSubmit: (details: CustomizationDetails) => void;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({ onSubmit }) => {
    const [designType, setDesignType] = useState('');
    const [fabricType, setFabricType] = useState('');
    const [measurements, setMeasurements] = useState({
        chest: 0,
        waist: 0,
        hips: 0,
        length: 0,
        shoulder: 0,
        armHole: 0,
        sleeves: 0,
        cuff: 0,
        frontNeck: 0,
        backNeck: 0,
        neckDeep: 0,
        chak: 0,    
        daman: 0,
    });
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [shirtSizes, setShirtSizes] = useState([{ 
        size: '', 
        length: 0, 
        armHole: 0, 
        shoulder: 0, 
        chest: 0, 
        waist: 0, 
        hips: 0, 
        daman: 0, 
        sleeves: 0, 
        cuff: 0,
        frontNeck: 0,
        backNeck: 0,
        neckDeep: 0,
    }]);
    const [trouserSizes, setTrouserSizes] = useState([{ size: '', length: 0, waist: 0, hips: 0, pancha: 0, elastic: false }]);
    const [showShirtSizes, setShowShirtSizes] = useState(false);
    const [showTrouserSizes, setShowTrouserSizes] = useState(false);
    const [naapProvided, setNaapProvided] = useState<'yes' | 'no'>('yes');
    // New state variables for checkboxes
    const [sout, setSout] = useState(false);
    const [category, setCategory] = useState('');
    const [uploadDesign, setUploadDesign] = useState<File | null>(null); // For file upload

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            designType,
            fabricType,
            measurements,
            additionalNotes,
            shirtSizes: shirtSizes.map(size => ({
                ...size,
                length: size.length,
                armHole: size.armHole,
                shoulder: size.shoulder,
                chest: size.chest,
                waist: size.waist,
                hips: size.hips,
                daman: size.daman,
                sleeves: size.sleeves,
                cuff: size.cuff,
            })),
            trouserSizes: trouserSizes.map(size => ({
                ...size,
                length: size.length,
                waist: size.waist,
                hips: size.hips,
                pancha: size.pancha,
            })),
            sout,
            category,
            uploadDesign: uploadDesign ? [uploadDesign] : [],
        });
    };

    const addShirtSize = () => {
        setShirtSizes([...shirtSizes, { 
            size: '', 
            length: 0, 
            armHole: 0, 
            shoulder: 0, 
            chest: 0, 
            waist: 0, 
            hips: 0, 
            daman: 0, 
            sleeves: 0, 
            cuff: 0,
            frontNeck: 0,
            backNeck: 0,
            neckDeep: 0,
        }]);
    };

    const addTrouserSize = () => {
        setTrouserSizes([...trouserSizes, { size: '', length: 0, waist: 0, hips: 0, pancha: 0, elastic: false }]);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Customization Details</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sout Provided:</label>
                <input 
                    type="text" 
                    value={designType} 
                    onChange={(e) => setDesignType(e.target.value)} 
                    required 
                    placeholder="2 PCS, 3 PCS, etc."
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Fabric Type:</label>
                <input 
                    type="text" 
                    value={fabricType} 
                    onChange={(e) => setFabricType(e.target.value)} 
                    required 
                    placeholder="LAWN, COTTON, SILK"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                />
            </div>
            
            

            {/* Shirt Sizes Section */}
            <div className="mb-4">
                <button type="button" onClick={() => setShowShirtSizes(!showShirtSizes)} className="mt-4 w-full bg-orange-500 text-white rounded-md p-2 hover:bg-orange-600">
                    {showShirtSizes ? 'Hide Shirt Sizes' : 'Add Shirt Sizes'}
                </button>
                {showShirtSizes && (
                    <div className="mt-4 p-4 border border-yellow-500 rounded-md">
                        <h3 className="text-lg font-semibold text-gray-700">Shirt Sizes:</h3>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Chest:</td>
                                    <td><input type="number" value={measurements.chest} onChange={(e) => setMeasurements({ ...measurements, chest: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Waist:</td>
                                    <td><input type="number" value={measurements.waist} onChange={(e) => setMeasurements({ ...measurements, waist: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Hips:</td>
                                    <td><input type="number" value={measurements.hips} onChange={(e) => setMeasurements({ ...measurements, hips: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Length:</td>
                                    <td><input type="number" value={measurements.length} onChange={(e) => setMeasurements({ ...measurements, length: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Shoulder:</td>
                                    <td><input type="number" value={measurements.shoulder} onChange={(e) => setMeasurements({ ...measurements, shoulder: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Armhole:</td>
                                    <td><input type="number" value={measurements.armHole} onChange={(e) => setMeasurements({ ...measurements, armHole: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Daman:</td>
                                    <td><input type="number" value={measurements.daman} onChange={(e) => setMeasurements({ ...measurements, daman: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Sleeves:</td>
                                    <td><input type="number" value={measurements.sleeves} onChange={(e) => setMeasurements({ ...measurements, sleeves: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Cuff:</td>
                                    <td><input type="number" value={measurements.cuff} onChange={(e) => setMeasurements({ ...measurements, cuff: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Front Neck:</td>
                                    <td><input type="number" value={measurements.frontNeck} onChange={(e) => setMeasurements({ ...measurements, frontNeck: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Back Neck:</td>
                                    <td><input type="number" value={measurements.backNeck} onChange={(e) => setMeasurements({ ...measurements, backNeck: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Neck Depth:</td>
                                    <td><input type="number" value={measurements.neckDeep} onChange={(e) => setMeasurements({ ...measurements, neckDeep: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Chak:</td>
                                    <td><input type="number" value={measurements.chak} onChange={(e) => setMeasurements({ ...measurements, chak: Number(e.target.value) })} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Trouser Sizes Section */}
            <div className="mb-4">
                <button type="button" onClick={() => setShowTrouserSizes(!showTrouserSizes)} className="mt-4 w-full bg-orange-500 text-white rounded-md p-2 hover:bg-orange-600">
                    {showTrouserSizes ? 'Hide Trouser Sizes' : 'Add Trouser Sizes'}
                </button>
                {showTrouserSizes && (
                    <div className="mt-4 p-4 border border-gray-300 rounded-md">
                        <h3 className="text-lg font-semibold text-gray-700">Trouser Sizes:</h3>
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Length:</td>
                                    <td><input type="number" value={trouserSizes[0].length} onChange={(e) => {
                                        const newSizes = [...trouserSizes];
                                        newSizes[0].length = Number(e.target.value);
                                        setTrouserSizes(newSizes);
                                    }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Waist:</td>
                                    <td><input type="number" value={trouserSizes[0].waist} onChange={(e) => {
                                        const newSizes = [...trouserSizes];
                                        newSizes[0].waist = Number(e.target.value);
                                        setTrouserSizes(newSizes);
                                    }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Hips:</td>
                                    <td><input type="number" value={trouserSizes[0].hips} onChange={(e) => {
                                        const newSizes = [...trouserSizes];
                                        newSizes[0].hips = Number(e.target.value);
                                        setTrouserSizes(newSizes);
                                    }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700">Pancha:</td>
                                    <td><input type="number" value={trouserSizes[0].pancha} onChange={(e) => {
                                        const newSizes = [...trouserSizes];
                                        newSizes[0].pancha = Number(e.target.value);
                                        setTrouserSizes(newSizes);
                                    }} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
<div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Additional Notes:</label>
                <textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Naap Provided:</label>
                            <div className="flex items-center">
                                <label className="mr-4">
                                    <input type="radio" value="yes" checked={naapProvided === 'yes'} onChange={() => setNaapProvided('yes')} />
                                    Yes
                                </label>
                                <label>
                                    <input type="radio" value="no" checked={naapProvided === 'no'} onChange={() => setNaapProvided('no')} />
                                    No
                                </label>
                            </div>
                        </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Design:</label>
                <input type="file" onChange={(e) => e.target.files && setUploadDesign(e.target.files[0])} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            <button type="submit" className="mt-4 w-full bg-orange-500 text-white rounded-md p-2 hover:bg-orange-600">Submit Customization</button>
        </form>
    );
};

export default CustomizationForm; 