import React, { useState } from "react";
import { motion } from "framer-motion";

const kisanRinData = {
  hi: {
    title: "किसान ऋण पोर्टल",
    subtitle: "सरल ऋण, समृद्ध किसान - डिजिटल केसीसी (KCC) क्रांति",
    detailsTitle: "पोर्टल की मुख्य विशेषताएं",
    points: [
      "यह पोर्टल किसान क्रेडिट कार्ड (KCC) के तहत ऋण वितरण को पूरी तरह डिजिटल और पारदर्शी बनाता है।",
      "किसानों को 3 लाख रुपये तक के अल्पकालिक कृषि ऋण पर 3% की ब्याज छूट (Interest Subvention) दी जाती है।",
      "पोर्टल बैंकों के साथ डेटा साझाकरण को सुव्यवस्थित करता है, जिससे ऋण की मंजूरी और वितरण तेज होता है।",
      "किसान अब अपने ऋण की स्थिति, सब्सिडी और देय राशि की जानकारी आसानी से ऑनलाइन देख सकते हैं।",
    ],
    linkLabel: "पोर्टल पर अपना ऋण विवरण देखें",
    linkUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1958814", // Official info link
  },
  en: {
    title: "Kisan Rin Portal (KRP)",
    subtitle: "Simplified Credit, Prosperous Farmer - Digital KCC Revolution",
    detailsTitle: "Key Portal Features",
    points: [
      "The portal makes the disbursement of loans under Kisan Credit Card (KCC) completely digital and transparent.",
      "Farmers receive an interest subvention of 3% on short-term agriculture loans up to ₹3 Lakh.",
      "Streamlines data sharing with banks, leading to faster loan approvals and processing.",
      "Farmers can now easily track their loan status, subsidies, and outstanding amounts online.",
    ],
    linkLabel: "Check Loan Details on Portal",
    linkUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1958814",
  },
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f8f9fa", // Neutral grey background
    color: "#212529",
    overflowX: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#1a237e", // Deep Indigo (Banking feel)
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "5px solid #ffca28", // Amber accent
    color: "white",
  },
  title: {
    fontFamily: "'Tiro Devanagari Hindi', serif",
    color: "#ffffff",
    fontSize: "2.5rem",
    marginBottom: "10px",
    marginTop: 0,
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#c5cae9", // Light indigo
    margin: 0,
  },
  toggleContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 100,
  },
  toggleButton: {
    padding: "10px 20px",
    backgroundColor: "#ffca28",
    color: "#1a237e",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease",
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
    color: "#1a237e",
    borderLeft: "5px solid #1a237e",
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
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderLeft: "4px solid transparent",
    transition: "all 0.3s ease",
  },
  pointHover: {
    transform: "translateY(-5px)",
    borderColor: "#1a237e",
    boxShadow: "0 6px 15px rgba(26, 35, 126, 0.15)",
  },
  linkSection: {
    textAlign: "center",
  },
  stylishLink: {
    display: "inline-block",
    padding: "15px 35px",
    background: "linear-gradient(45deg, #1a237e, #3949ab)", // Indigo gradient
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderRadius: "5px", // Sharper edges for banking look
    boxShadow: "0 5px 15px rgba(26, 35, 126, 0.3)",
    transition: "all 0.3s ease",
  },
  stylishLinkHover: {
    boxShadow: "0 8px 20px rgba(26, 35, 126, 0.5)",
    transform: "scale(1.05)",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#eeeeee",
    fontSize: "0.9rem",
    color: "#616161",
    marginTop: "auto",
    borderTop: "1px solid #ddd",
  },
};

const KisanRinPage = () => {
  const [language, setLanguage] = useState("hi");
  const [hoveredLink, setHoveredLink] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const t = kisanRinData[language];

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "hi" ? "en" : "hi"));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const dropVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div style={styles.container}>
      {/* Language Switch */}
      <div style={styles.toggleContainer}>
        <button
          style={styles.toggleButton}
          onClick={toggleLanguage}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {language === "hi" ? "English" : "हिंदी"}
        </button>
      </div>

      {/* Header */}
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

      {/* Main Content */}
      <motion.main
        style={styles.mainContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section style={styles.section} variants={fadeInVariants}>
          <h2 style={styles.sectionTitle}>{t.detailsTitle}</h2>
          <div style={styles.pointsList}>
            {t.points.map((point, index) => (
              <motion.div
                key={index}
                style={{
                  ...styles.point,
                  ...(hoveredPoint === index ? styles.pointHover : {}),
                }}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                variants={fadeInVariants}
              >
                <strong>{index + 1}.</strong> {point}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Action Link */}
        <motion.section
          style={{ ...styles.section, ...styles.linkSection }}
          variants={fadeInVariants}
        >
          <h3>
            {language === "hi"
              ? "वित्तीय सेवाओं तक पहुँचें"
              : "Access Financial Services"}
          </h3>
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
          </a>
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          {language === "hi"
            ? "डिजिटल ऋण प्रबंधन"
            : "Digital Credit Management"}
        </p>
      </footer>
    </div>
  );
};

export default KisanRinPage;
