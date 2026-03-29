import React, { useState } from "react";
import { motion } from "framer-motion";

const pmKisanData = {
  hi: {
    title: "प्रधानमंत्री किसान सम्मान निधि योजना",
    subtitle: "किसानों की समृद्धि, देश की प्रगति",
    detailsTitle: "योजना के मुख्य विवरण (Pointwise)",
    points: [
      "यह केंद्र सरकार द्वारा शत-प्रतिशत वित्त पोषित एक केंद्रीय क्षेत्र की योजना है।",
      "इस योजना के तहत, सभी पात्र भूमिधारक किसान परिवारों को प्रति वर्ष 6,000 रुपये की वित्तीय सहायता प्रदान की जाती है।",
      "यह राशि 2,000 रुपये की तीन समान किश्तों में सीधे लाभार्थियों के बैंक खातों में हस्तांतरित की जाती है।",
      "इसका मुख्य उद्देश्य छोटे और सीमांत किसानों की आय को बढ़ाना और उनकी कृषि आवश्यकताओं को पूरा करने में मदद करना है।",
    ],
    linkLabel: "आधिकारिक पोर्टल पर जाएं",
    linkUrl: "https://pmkisan.gov.in/",
  },
  en: {
    title: "Pradhan Mantri Kisan Samman Nidhi Yojana",
    subtitle: "Farmer prosperity, nation's progress",
    detailsTitle: "Key Scheme Details (Pointwise)",
    points: [
      "This is a Central Sector Scheme with 100% funding from the Government of India.",
      "Under the scheme, an income support of ₹6,000 per year is provided to all eligible landholding farmer families.",
      "The benefit is transferred directly to the bank accounts of the beneficiaries in three equal installments of ₹2,000 each.",
      "The primary objective is to augment the income of Small and Marginal Farmers (SMFs) and meet their agricultural needs.",
    ],
    linkLabel: "Visit Official Portal",
    linkUrl: "https://pmkisan.gov.in/",
  },
};

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f4fbf4", // Light greenish background
    color: "#333",
    overflowX: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#e8f5e9",
    padding: "60px 20px",
    textAlign: "center",
    borderBottom: "5px solid #28a745",
  },
  title: {
    fontFamily: "'Tiro Devanagari Hindi', serif", // Apply if needed for Hindi
    color: "#1a531a", // Dark green for headings
    fontSize: "2.5rem",
    marginBottom: "10px",
    marginTop: 0,
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
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
    backgroundColor: "#28a745",
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
    flex: 1, // Let main content expand
  },
  section: {
    marginBottom: "50px",
  },
  sectionTitle: {
    fontFamily: "'Tiro Devanagari Hindi', serif", // Apply if needed for Hindi
    color: "#1a531a", // Dark green
    borderLeft: "5px solid #8bc34a",
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
    borderColor: "#8bc34a",
  },
  linkSection: {
    textAlign: "center",
  },
  stylishLink: {
    display: "inline-block",
    padding: "15px 30px",
    background: "linear-gradient(45deg, #28a745, #8bc34a)",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    borderRadius: "50px",
    boxShadow: "0 5px 15px rgba(40, 167, 69, 0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  stylishLinkHover: {
    boxShadow: "0 8px 20px rgba(40, 167, 69, 0.5)",
    transform: "translateY(-3px)",
  },
  arrow: {
    display: "inline-block",
    marginLeft: "10px",
    transition: "transform 0.3s ease",
  },
  stylishLinkArrowHover: {
    transform: "translateX(5px)",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#e8f5e9",
    fontSize: "0.9rem",
    color: "#777",
    marginTop: "auto",
  },
};

const PmKisanPage = () => {
  const [language, setLanguage] = useState("hi");
  const [hoveredLink, setHoveredLink] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const t = pmKisanData[language];

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "hi" ? "en" : "hi"));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animations of children
      },
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
      {/* Translation Toggle Button */}
      <div style={styles.toggleContainer}>
        <button
          id="langToggle"
          style={styles.toggleButton}
          onClick={toggleLanguage}
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

        {/* Stylish Link Section */}
        <motion.section
          style={{ ...styles.section, ...styles.linkSection }}
          variants={slideInVariants}
        >
          <h3>
            {language === "hi"
              ? "अधिक जानकारी और पंजीकरण"
              : "More Information & Registration"}
          </h3>
          <motion.div
            variants={bounceVariants}
            animate="animate"
            style={{ display: "inline-block" }} // Ensure bounce applies correctly
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
                  ...(hoveredLink ? styles.stylishLinkArrowHover : {}),
                }}
              >
                →
              </span>
            </a>
          </motion.div>
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          {language === "hi" ? "किसान सेतु" : "Kisan Setu"}
        </p>
      </footer>
    </div>
  );
};

export default PmKisanPage;
