import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { MOCK_PRODUCTS, CATEGORIES } from "../../data/mockData";
import { Search, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Shop = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [priceRange, setPriceRange] = useState(500000000); 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") searchParams.delete("category");
    else searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           (product.location && product.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPrice = product.price <= priceRange;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [selectedCategory, searchTerm, priceRange]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <section className="bg-primary pt-16 pb-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
           <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Trouvez le bien de vos rêves
           </h1>
           <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Quartier, ville ou nom du projet..." 
                  className="w-full h-14 pl-12 pr-4 rounded-xl focus:outline-none text-secondary-dark font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="h-14 px-8 rounded-xl text-lg">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
           </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-xl flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2 text-primary" />
                  Filtres
                </h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Budget Max</h4>
                  <input 
                    type="range" 
                    min="1000000" 
                    max="500000000" 
                    step="1000000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between mt-2 text-sm font-bold text-primary">
                    <span>1M F</span>
                    <span>{ (priceRange / 1000000).toFixed(0) }M F CFA</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Type de bien</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => handleCategoryChange("All")}
                      className={`text-left text-sm py-3 px-4 rounded-xl transition-all ${selectedCategory === "All" ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" : "bg-slate-50 text-secondary hover:bg-slate-100"}`}
                    >
                      Tous les types
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-left text-sm py-3 px-4 rounded-xl transition-all ${selectedCategory === cat ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" : "bg-slate-50 text-secondary hover:bg-slate-100"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
               <p className="text-secondary-dark font-medium">
                  <span className="text-primary font-bold">{filteredProducts.length}</span> biens disponibles
               </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => addToCart(product)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-secondary text-lg font-medium">Aucun bien ne correspond à vos critères.</p>
                  <Button 
                      variant="outline" 
                      className="mt-6 rounded-xl"
                      onClick={() => {setSearchTerm(""); setSelectedCategory("All"); setPriceRange(500000000);}}
                  >
                      Réinitialiser la recherche
                  </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;