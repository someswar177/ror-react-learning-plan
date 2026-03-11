import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

function App() {
  return (
    <div>

      <Header />

      <ProductCard
        title="React Basics"
        description="Understanding components and props"
      />

      <ProductCard
        title="Component Architecture"
        description="Building reusable UI components"
      />

      <Footer />

    </div>
  );
}

export default App;