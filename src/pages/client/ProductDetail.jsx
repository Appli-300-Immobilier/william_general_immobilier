import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PRODUCTS } from "../../data/mockData";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { ChevronLeft, Heart, ShieldCheck, MapPin, Bed, Bath, Square, FileText, Camera, CheckCircle } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === id), [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Bien non trouvé</h2>
        <Button onClick={() => navigate("/catalogue")} className="mt-4">Retour au catalogue</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-secondary hover:text-primary mb-6 transition-colors font-medium"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Retour aux résultats
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100">
               <div className="aspect-[16/9] rounded-[2rem] overflow-hidden relative">
                  <img 
                    src={product.imageUrl} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200"; e.target.onerror = null; }} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase">{product.category}</span>
                  <span className="flex items-center text-secondary text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1" /> {product.location || "Douala, Cameroun"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark leading-tight">{product.name}</h1>
              </div>

              <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-100">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-secondary-dark">{product.beds || 0} Chambres</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-secondary-dark">{product.baths || 0} Douches</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 bg-slate-50 rounded-2xl">
                    <Square className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-secondary-dark">{product.sqft || 0} m²</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-secondary-dark">Description du bien</h3>
                <p className="text-secondary leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                 <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="font-bold text-sm text-green-700">Titre Foncier Disponible</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="font-bold text-sm text-green-700">Visite Guidée Gratuite</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-24">
              <div className="mb-6">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Prix de vente</span>
                <p className="text-4xl font-black text-primary mt-1">
                  {product.price.toLocaleString()} <span className="text-lg">F CFA</span>
                </p>
              </div>

              <div className="space-y-3">
                {!isAdmin && (
                  <Button 
                    size="lg" 
                    className="w-full h-16 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl"
                    onClick={() => addToCart(product)}
                  >
                    <Heart className="mr-2 h-6 w-6" />
                    Sélectionner
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full h-16 text-lg font-bold rounded-2xl border-2"
                  onClick={() => navigate("/contact")}
                >
                  Contacter l agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;