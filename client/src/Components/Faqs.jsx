import React from "react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = React.useState(null);
  const faqsData = [
    {
      question: "Kisan Setu क्या है?",
      answer:
        "Kisan Setu एक स्मार्ट प्लेटफॉर्म है जो किसानों को AI की मदद से फसल सलाह, फसल सिफारिश और कीट/बीमारी की पहचान करने में मदद करता है।",
    },
    {
      question: "मैं Kisan Setu का उपयोग कैसे शुरू करूँ?",
      answer:
        "बस “खाता बनाएं” पर क्लिक करें, अपनी जानकारी भरें और “शुरू करें” — आप तुरंत सेवाओं का उपयोग कर सकते हैं।",
    },
    {
      question: "AI चैटबॉट क्या करता है?",
      answer:
        "AI चैटबॉट आपके फसल से जुड़े सवालों का तुरंत जवाब देता है और सही सलाह प्रदान करता है।",
    },
    {
      question: "कीट या बीमारी की पहचान कैसे करें?",
      answer:
        "फसल की फोटो अपलोड करें — AI तुरंत कीट या बीमारी पहचानकर समाधान बताएगा।",
    },
    {
      question: "फसल की सिफारिश कैसे मिलती है?",
      answer:
        "अपने राज्य और जिले का नाम दर्ज करें — उसी आधार पर आपको सबसे उपयुक्त फसल की सलाह मिलेगी।",
    },
  ];
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <div className="flex flex-col items-center text-center text-slate-800  px-3 pb-20 pt-15">
        <p className="text-base font-medium text-slate-600">FAQ</p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">
          अक्सर पूछे जाने वाले सवाल
        </h1>
        <p className="text-sm text-slate-500 mt-4 max-w-sm">
          इन सवालों के जवाब पहले से देने से उपयोगकर्ताओं का भरोसा बढ़ता है और
          सहायता की जरूरत कम हो जाती है।
        </p>
        <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
          {faqsData.map((faq, index) => (
            <div key={index} className="flex flex-col items-start w-full">
              <div
                className="flex items-center justify-between w-full cursor-pointer bg-linear-to-r from-green-100 to-white border border-indigo-100 p-4 rounded"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h2 className="text-sm">{faq.question}</h2>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-300px translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Faqs;
