export interface CustomizationDetails {
    designType: string;
    fabricType: string;
    measurements: {
        chest: number;
        waist: number;
        hips: number;
        length: number;
        armHole: number;
        shoulder: number;
        daman: number;
        sleeves: number;
        cuff: number;
        frontNeck: number;
        backNeck: number;
        neckDeep: number;
        chak: number;
    };
    additionalNotes?: string;
    shirtSizes?: Array<{
        size: string;
        length: number;
        armHole: number;
        shoulder: number;
        chest: number;
        waist: number;
        hips: number;
        daman: number;
        sleeves: number;
        cuff: number;
        frontNeck: number;
        backNeck: number;
        neckDeep: number;
        image?: string;
    }>;
    trouserSizes?: Array<{
        size: string;
        length: number;
        waist: number;
        hips: number;
        pancha: number;
        elastic: boolean;
    }>;
    naapProvided?: boolean;
    sout?: boolean;
    category?: string;
    uploadDesign?: File[];
}

