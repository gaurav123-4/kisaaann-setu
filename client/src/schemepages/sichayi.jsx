import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sinchaiData = {
  hi: {
    title: "प्रधानमंत्री कृषि सिंचाई योजना",
    subtitle: "हर खेत को पानी | प्रति बूंद अधिक फसल",
    detailsTitle: "योजना के मुख्य लक्ष्य",
    points: [
      "क्षेत्रीय स्तर पर सिंचाई में निवेश का अभिसरण (Convergence) सुनिश्चित करना।",
      "खेतों में पानी की भौतिक पहुंच का विस्तार करना और खेती योग्य क्षेत्र का विस्तार करना।",
      "पानी की बर्बादी को कम करने के लिए 'प्रति बूंद अधिक फसल' (More Crop Per Drop) को बढ़ावा देना।",
      "सटीक सिंचाई और जल संचयन की आधुनिक तकनीकों को अपनाना।",
    ],
    linkLabel: "अधिक जानकारी और पंजीकरण",
    linkUrl: "https://pmksy.gov.in/",
  },
  en: {
    title: "PM Krishi Sinchai Yojana",
    subtitle: "Har Khet Ko Pani | More Crop Per Drop",
    detailsTitle: "Key Objectives of the Scheme",
    points: [
      "Convergence of investments in irrigation at the field level.",
      "Expand cultivable area and enhance physical access to water on the farm.",
      "Promote 'More Crop Per Drop' to reduce water wastage and improve efficiency.",
      "Adopt precision-irrigation and modern water harvesting technologies.",
    ],
    linkLabel: "More Info & Registration",
    linkUrl: "https://pmksy.gov.in/",
  },
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#e0f2f1", // Light Watery Teal
    color: "#004d40",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #00796b 0%, #004d40 100%)",
    padding: "70px 20px",
    textAlign: "center",
    color: "white",
    borderBottom: "5px solid #26a69a",
    position: "relative",
  },
  title: {
    fontFamily: "'Tiro Devanagari Hindi', serif",
    fontSize: "2.5rem",
    margin: 0,
    textShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  mainContent: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
    flex: 1,
    width: "100%",
  },
  pointCard: {
    background: "white",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "15px 0 15px 0",
    borderLeft: "6px solid #00bfa5",
    boxShadow: "0 5px 15px rgba(0, 77, 64, 0.08)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  btn: {
    padding: "15px 40px",
    background: "linear-gradient(45deg, #00796b, #00bfa5)",
    color: "white",
    border: "none",
    fontWeight: "bold",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "1.1rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 8px 20px rgba(0, 191, 165, 0.3)",
    transition: "all 0.3s ease",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderTop: "3px solid #ffffff",
    borderRadius: "50%",
  },
};

const SinchaiPage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [lang, setLang] = useState("hi");
  const t = sinchaiData[lang];

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = (e) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(t.linkUrl, "_blank");
      setIsRedirecting(false);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {/* Animated Header */}
      <motion.header
        style={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={styles.title}>{t.title}</h1>
        <p style={{ color: "#b2dfdb", fontSize: "1.1rem" }}>{t.subtitle}</p>
      </motion.header>

      <main style={styles.mainContent}>
        <AnimatePresence mode="wait">
          {isPageLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", marginTop: "50px" }}
            >
              <p>💧 सिंचाई डेटा लोड हो रहा है...</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                {t.detailsTitle}
              </h2>

              {t.points.map((p, idx) => (
                <motion.div
                  key={idx}
                  style={styles.pointCard}
                  variants={{
                    hidden: { x: -30, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: "#f0fdfa" }}
                >
                  <span style={{ fontSize: "1.2rem" }}>🔹</span>
                  <p style={{ margin: 0 }}>{p}</p>
                </motion.div>
              ))}

              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <motion.button
                  onClick={handleRedirect}
                  style={styles.btn}
                  disabled={isRedirecting}
                  whileHover={
                    !isRedirecting
                      ? {
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(0, 191, 165, 0.5)",
                        }
                      : {}
                  }
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
                          ? "पोर्टल खुल रहा है..."
                          : "Opening Portal..."}
                      </span>
                    </>
                  ) : (
                    <>
                      {t.linkLabel} <span>🌊</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#00796b",
          borderTop: "1px solid #b2dfdb",
        }}
      >
        <button
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          style={{
            marginBottom: "15px",
            padding: "5px 15px",
            cursor: "pointer",
            border: "1px solid #00796b",
            borderRadius: "20px",
            background: "none",
            color: "#00796b",
          }}
        >
          {lang === "hi" ? "English" : "हिंदी"}
        </button>
        <p>© {new Date().getFullYear()} जल शक्ति एवं कृषि मंत्रालय</p>
      </footer>
    </div>
  );
};

export default SinchaiPage;
