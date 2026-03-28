import React from 'react'

const Scheme = () => {
    const [stopScroll, setStopScroll] = React.useState(false);
    const cardData = [
        {
            title: "प्रधानमंत्री किसान सम्मान निधि योजना",
            image: "https://images.news18.com/ibnlive/uploads/2026/01/farmer-scheme-pm-kisan-yojana-2026-01-64eb5e3361a175c4777a1a4184aeb8ed-16x9.png?impolicy=website&width=640&height=360",
        },
        {
            title: "किसान ऋण पोर्टल",
            image: "https://www.shutterstock.com/image-photo/portrait-indian-rural-farmer-standing-260nw-2592541429.jpg",
        },
        {
            title: "कृषि एवं किसान कल्याण विभाग",
            image: "https://media.gettyimages.com/id/1155209417/photo/woman-farming-in-agricultural-field.jpg?s=612x612&w=gi&k=20&c=deQ688lpy9DU2X67cdCELmVnaDQVpTPbELkJnnqatgo=",
        },
        {
            title: "प्रधानमंत्री किसान सिंचाई योजना",
            image: "https://img.khetivyapar.com/images/news/1713762716-these-government-schemes-for-farmers-in-madhya-pradesh-madhya-pradesh-scheme-2024.jpg",
        },
        {
        title: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
            image: "https://c8.alamy.com/comp/PR78TB/map-of-india-shows-indian-farmer-portrait-holding-plow-on-white-gradient-background-indian-agriculture-kisan-diwas-concept-PR78TB.jpg",
        },
    ];

    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden pt-15 w-full relative max-w-6xl mx-auto" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div key={index} className="w-56 mx-4 h-80 relative group hover:scale-90 transition-all duration-300">
                                <img src={card.image} alt="card" className="w-full h-full object-cover" />
                                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                                    <p className="text-white text-lg font-semibold text-center">{card.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
            </div>
        </>
    );
};
export default Scheme
