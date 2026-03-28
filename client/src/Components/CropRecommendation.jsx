import { useState } from "react";

const CropRecommendation = () => {
  // Is state se hum widget ko dikhayenge ya chhupayenge
  const [showStreamlit, setShowStreamlit] = useState(false);

  // Crop Recommendation ka actual deployed URL
  const STREAMLIT_URL =
    "https://crop-recommendation-bits.streamlit.app/?embed=true";

  const toggleWidget = () => {
    setShowStreamlit(!showStreamlit);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>🌾</div>
        <h2 style={styles.title}>AI फसल अनुशंसा (Crop Recommendation)</h2>
        <p style={styles.text}>
          मिट्टी के पोषक तत्वों (N-P-K) और अपने जिले के आधार पर जानें कि आपके
          खेत के लिए कौन सी फसल सबसे अच्छी है।
        </p>

        <button
          onClick={toggleWidget}
          style={{
            ...styles.button,
            backgroundColor: showStreamlit ? "#dc2626" : "#166534",
          }}
        >
          {showStreamlit
            ? "बंद करें (Close Widget)"
            : "टूल खोलें (Get Recommendation)"}
        </button>
      </div>

      {/* Conditional Rendering: Jab button dabega tabhi load hoga */}
      {showStreamlit && (
        <div style={styles.iframeWrapper}>
          <div style={styles.loaderInfo}>
            <span>⚙️ AI Model Loading...</span>
          </div>
          <iframe
            src={STREAMLIT_URL}
            title="Crop Recommendation Widget"
            width="100%"
            height="850px"
            style={styles.iframe}
            // Isme camera ki zarurat nahi hai par geolocation useful ho sakti hai
            allow="geolocation"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "60px 20px",
    backgroundColor: "#f0fdf4", // Light green background
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "40px 30px",
    backgroundColor: "#fff",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #dcfce7",
  },
  iconContainer: {
    fontSize: "50px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#14532d", // Dark green
  },
  text: {
    color: "#4b5563",
    marginBottom: "25px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  button: {
    padding: "14px 32px",
    color: "#fff",
    border: "none",
    borderRadius: "50px", // Rounded pill style
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(22, 101, 52, 0.2)",
  },
  iframeWrapper: {
    marginTop: "40px",
    width: "100%",
    maxWidth: "1100px",
    margin: "40px auto",
    position: "relative",
  },
  loaderInfo: {
    textAlign: "center",
    fontSize: "12px",
    color: "#166534",
    marginBottom: "10px",
    fontWeight: "500",
  },
  iframe: {
    border: "4px solid #fff",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },
};

export default CropRecommendation;
