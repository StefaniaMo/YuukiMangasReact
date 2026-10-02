import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
