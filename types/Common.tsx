// Common.tsx

// Interfaces related to Tour Packages and Itineraries
interface IItineraryLineDataType {
    name: { [key: string]: string };
    description: {
        S: string | string[];
        images?: { src: string; alt: string }[];
    };
    Id: { [key: string]: string };
    day: { [key: string]: string };
}

interface IItineraryDetailDataType {
    M: IItineraryLineDataType;
}

interface IPackageDetailDataType {
    Id: number;
    Days: number;
    DurationDisplay: string;
    Itinerary: Array<IItineraryDetailDataType>;
    Name: string;
    LocationDescription: string;
    Tags: Array<string>;
    Title: string;
    Uri: string;
    Description: string;
    NoOfRatings: number;
    Ratings: number;
    Overview: string;
    Card_Heading: string;
    Summary: string;
}

interface IPackageSummaryCardProp {
    tourPackage: IPackageDetailDataType;
    onSale: boolean;
}

// Interface for Testimonials
interface ITestimonialDataType {
    Id: number;
    User: string;
    Content: string;
    Location: string;
    Img: string;
}

// Blog structure interfaces
interface IBlogLink {
    text: string;
    url: string;
    key: string;
}

type IBlogLinks = IBlogLink[];

interface IBlogIntroduction {
    content: string;
    links?: IBlogLinks;
}

interface IBlogBulletPoint {
    title?: string;
    content: string;
}

interface IBlogSubheading {
    title: string;
    content: string;
    links?: IBlogLinks;
}

interface IBlogSection {
    heading: string;
    content?: string;
    links?: IBlogLinks;
    bullet_points?: Array<string | IBlogBulletPoint>;
    subheadings?: Array<IBlogSubheading>;
}

interface IBlogConclusion {
    heading: string;
    content: string;
    links?: IBlogLinks;
}

interface IBlogStructure {
    introduction: IBlogIntroduction;
    main_sections: Array<IBlogSection>;
    conclusion: IBlogConclusion;
}

interface IBlogFAQItem {
    question: string;
    answer: string;
}

interface IBlogDataType {
    url: string;
    title: string;
    description: string;
    image: string;
    feature_image: string;
    page_heading: string;
    structure: IBlogStructure;
    faq?: IBlogFAQItem[];  // <-- Add FAQ here as optional
}

export type {
    IPackageDetailDataType,
    IItineraryDetailDataType,
    IItineraryLineDataType,
    ITestimonialDataType,
    IBlogDataType,
    IBlogIntroduction,
    IBlogSection,
    IBlogConclusion,
    IBlogStructure,
    IBlogLink,
    IBlogLinks,
    IBlogBulletPoint,
    IBlogSubheading,
    IPackageSummaryCardProp,
    IBlogFAQItem,  // newly added
};
