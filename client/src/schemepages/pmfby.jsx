import React, { useState } from "react";
import { motion } from "framer-motion";

const pmfbyData = {
  hi: {
    title: "प्रधानमंत्री फसल बीमा योजना",
    subtitle: "मेरी पॉलिसी, मेरे हाथ - सुरक्षित फसल, समृद्ध किसान",
    detailsTitle: "योजना की मुख्य विशेषताएं",
    points: [
      "यह प्राकृतिक आपदाओं, कीटों और रोगों के कारण फसल नुकसान के खिलाफ व्यापक बीमा कवर प्रदान करता है।",
      "किसानों द्वारा देय प्रीमियम दरें बहुत कम हैं: खरीफ के लिए 2%, रबी के लिए 1.5% और बागवानी फसलों के लिए 5%।",
      "बाकी प्रीमियम का भुगतान सरकार द्वारा किया जाता है ताकि किसानों पर बोझ कम हो सके।",
      "दावा प्रक्रिया को तेज करने के लिए स्मार्टफोन, रिमोट सेंसिंग और ड्रोन जैसी आधुनिक तकनीक का उपयोग किया जाता है।",
    ],
    linkLabel: "आधिकारिक पोर्टल पर बीमा कराएं",
    linkUrl: "https://pmfby.gov.in/",
  },
  en: {
    title: "Pradhan Mantri Fasal Bima Yojana",
    subtitle: "My Policy, In My Hands - Safe Crops, Prosperous Farmers",
    detailsTitle: "Key Scheme Features",
    points: [
      "Provides comprehensive insurance cover against crop failure due to natural calamities, pests, and diseases.",
      "Extremely low premium rates for farmers: 2% for Kharif, 1.5% for Rabi, and 5% for Horticultural crops.",
      "The balance premium is paid by the Government to reduce the financial burden on farmers.",
      "Uses modern technology like smartphones, remote sensing, and drones for faster claim settlements.",
    ],
    linkLabel: "Apply on Official Portal",
    linkUrl: "https://pmfby.gov.in/",
  },
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f7ff", // Very light blue background
    color: "#2c3e50",
    overflowX: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#e3f2fd", // Soft blue header
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "5px solid #0288d1", // Deep blue accent
  },
  title: {
    fontFamily: "'Tiro Devanagari Hindi', serif",
    color: "#01579b", // Deepest blue
    fontSize: "2.5rem",
    marginBottom: "10px",
    marginTop: 0,
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#546e7a",
    margin: 0,
    fontWeight: "500",
  },
  toggleContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 100,
  },
  toggleButton: {
    padding: "10px 20px",
    backgroundColor: "#0288d1",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease",
  },
  mainContent: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "0 20px",
    flex: 1,
  },
  section: {
    marginBottom: "50px",
  },
  sectionTitle: {
    fontFamily: "'Tiro Devanagari Hindi', serif",
    color: "#01579b",
    borderLeft: "5px solid #ffb300", // Golden Yellow accent
    paddingLeft: "15px",
    marginBottom: "30px",
    marginTop: 0,
  },
  pointsList: {
    listStyleType: "none",
    padding: 0,
  },
  point: {
    background: "white",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    borderLeft: "4px solid transparent",
    transition: "transform 0.3s ease, border-color 0.3s ease",
  },
  pointHover: {
    transform: "translateX(10px)",
    borderColor: "#ffb300", // Golden on hover
  },
  linkSection: {
    textAlign: "center",
  },
  stylishLink: {
    display: "inline-block",
    padding: "15px 30px",
    background: "linear-gradient(45deg, #0288d1, #26c6da)", // Blue gradient
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderRadius: "50px",
    boxShadow: "0 5px 15px rgba(2, 136, 209, 0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  stylishLinkHover: {
    boxShadow: "0 8px 20px rgba(2, 136, 209, 0.5)",
    transform: "translateY(-3px)",
  },
  arrow: {
    display: "inline-block",
    marginLeft: "10px",
    transition: "transform 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#e3f2fd",
    fontSize: "0.9rem",
    color: "#78909c",
    marginTop: "auto",
  },
};

const PmfbyPage = () => {
  const [language, setLanguage] = useState("hi");
  const [hoveredLink, setHoveredLink] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const t = pmfbyData[language];

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "hi" ? "en" : "hi"));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const dropVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const bounceVariants = {
    animate: {
      y: [0, -15, 0, -7, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.toggleContainer}>
        <button style={styles.toggleButton} onClick={toggleLanguage}>
          {language === "hi" ? "English" : "हिंदी"}
        </button>
      </div>

      <motion.header
        style={styles.header}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 style={styles.title} variants={dropVariants}>
          {t.title}
        </motion.h1>
        <motion.p style={styles.subtitle} variants={dropVariants}>
          {t.subtitle}
        </motion.p>
      </motion.header>

      <motion.main
        style={styles.mainContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section style={styles.section} variants={slideInVariants}>
          <h2 style={styles.sectionTitle}>{t.detailsTitle}</h2>
          <motion.ul style={styles.pointsList} variants={containerVariants}>
            {t.points.map((point, index) => (
              <motion.li
                key={index}
                style={{
                  ...styles.point,
                  ...(hoveredPoint === index ? styles.pointHover : {}),
                }}
                variants={fadeInVariants}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          style={{ ...styles.section, ...styles.linkSection }}
          variants={slideInVariants}
        >
          <h3>
            {language === "hi"
              ? "पॉलिसी की स्थिति जानें"
              : "Check Policy Status"}
          </h3>
          <motion.div
            variants={bounceVariants}
            animate="animate"
            style={{ display: "inline-block" }}
          >
            <a
              href={t.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.stylishLink,
                ...(hoveredLink ? styles.stylishLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink(true)}
              onMouseLeave={() => setHoveredLink(false)}
            >
              {t.linkLabel}
              <span
                style={{
                  ...styles.arrow,
                  transform: hoveredLink ? "translateX(5px)" : "translateX(0)",
                }}
              >
                →
              </span>
            </a>
          </motion.div>
        </motion.section>
      </motion.main>

      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          {language === "hi" ? "किसान सुरक्षा" : "Kisan Suraksha"}
        </p>
      </footer>
    </div>
  );
};

export default PmfbyPage;
