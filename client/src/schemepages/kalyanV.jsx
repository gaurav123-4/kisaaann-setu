import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const deptData = {
  hi: {
    title: "कृषि एवं किसान कल्याण विभाग",
    subtitle: "भारत सरकार | कृषि एवं किसान कल्याण मंत्रालय",
    detailsTitle: "विभाग के मुख्य स्तंभ",
    points: [
      "कृषि नीतियों का निर्धारण और किसानों के कल्याण के लिए योजनाओं का कार्यान्वयन।",
      "खाद्यान्न आत्मनिर्भरता सुनिश्चित करना और कृषि निर्यात को बढ़ावा देना।",
      "डिजिटल कृषि मिशन के माध्यम से खेती में आधुनिक तकनीक का समावेश।",
      "सतत कृषि और मृदा स्वास्थ्य प्रबंधन के लिए राष्ट्रीय स्तर पर मार्गदर्शन।",
    ],
    linkLabel: "अधिक जानकारी और रिपोर्ट",
    linkUrl: "https://www.agriwelfare.gov.in/",
  },
  en: {
    title: "Dept. of Agriculture & Farmers Welfare",
    subtitle: "Govt. of India | Ministry of Agriculture & FW",
    detailsTitle: "Major Pillars of the Department",
    points: [
      "Formulation of agricultural policies and implementation of welfare schemes.",
      "Ensuring food grain self-sufficiency and boosting agricultural exports.",
      "Integration of modern technology through the Digital Agriculture Mission.",
      "National guidance for sustainable farming and soil health management.",
    ],
    linkLabel: "More Info & Reports",
    linkUrl: "https://www.agriwelfare.gov.in/",
  },
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#fffcfc",
    color: "#4a0404",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#800000",
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "5px solid #d4af37",
    color: "white",
  },
  title: {
    fontFamily: "'Tiro Devanagari Hindi', serif",
    fontSize: "2.6rem",
    margin: 0,
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  pointCard: {
    background: "white",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid #eee",
    boxShadow: "0 4px 15px rgba(128, 0, 0, 0.05)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  btn: {
    padding: "15px 40px",
    background: "linear-gradient(135deg, #800000 0%, #a52a2a 100%)",
    color: "#d4af37",
    border: "2px solid #d4af37",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 10px 20px rgba(128,0,0,0.2)",
    position: "relative",
  },
  // Button Loader Style
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(212, 175, 55, 0.3)",
    borderTop: "3px solid #d4af37",
    borderRadius: "50%",
  },
};

const AgriDeptPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [lang, setLang] = useState("hi");
  const t = deptData[lang];

  // Initial Page Load effect
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle Button Click with Loading
  const handleRedirect = (e) => {
    e.preventDefault();
    setIsRedirecting(true);

    // Simulating a delay before opening the official site
    setTimeout(() => {
      window.open(t.linkUrl, "_blank");
      setIsRedirecting(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <motion.header style={styles.header}>
        <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} style={styles.title}>
          {t.title}
        </motion.h1>
        <p style={{ color: "#ffd700", opacity: 0.9 }}>{t.subtitle}</p>
      </motion.header>

      <main
        style={{
          maxWidth: "850px",
          margin: "40px auto",
          padding: "0 20px",
          width: "100%",
          flex: 1,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#800000" }}>
          {t.detailsTitle}
        </h2>

        <div style={{ marginTop: "30px" }}>
          {isPageLoading ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <p>Loading Department Data...</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {t.points.map((p, idx) => (
                <motion.div
                  key={idx}
                  style={styles.pointCard}
                  whileHover={{ scale: 1.01 }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#d4af37",
                    }}
                  />
                  <p style={{ margin: 0 }}>{p}</p>
                </motion.div>
              ))}

              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <motion.button
                  onClick={handleRedirect}
                  style={styles.btn}
                  disabled={isRedirecting}
                  whileHover={!isRedirecting ? { scale: 1.05 } : {}}
                  whileTap={!isRedirecting ? { scale: 0.95 } : {}}
                >
                  {isRedirecting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        style={styles.spinner}
                      />
                      <span>
                        {lang === "hi"
                          ? "पोर्टल लोड हो रहा है..."
                          : "Loading Portal..."}
                      </span>
                    </>
                  ) : (
                    t.linkLabel
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <footer
        style={{
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #ddd",
          color: "#888",
        }}
      >
        <button
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          style={{
            marginBottom: "15px",
            padding: "5px 15px",
            cursor: "pointer",
            border: "1px solid #800000",
            background: "none",
            color: "#800000",
          }}
        >
          {lang === "hi" ? "English" : "हिंदी"}
        </button>
        <p>© {new Date().getFullYear()} DA&FW - Ministry of Agriculture</p>
      </footer>
    </div>
  );
};

export default AgriDeptPage;
