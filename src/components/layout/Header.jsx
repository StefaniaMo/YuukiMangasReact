import Navbar from "./Navbar";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#F2C5BB",
        borderBottom: "2px solid #A66946",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{ color: "#A66946", fontSize: "1.75rem", fontWeight: "900" }}
        >
          Yuuki<span style={{ color: "#555555" }}>Mangas</span>
        </h1>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
