import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../context/AuthContext";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <Link to={`/bien/${product.id}`}>
        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
          <img 
            src={product.imageUrl} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200"; e.target.onerror = null; }} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm text-secondary-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                {product.category}
            </div>
            {product.featured && (
              <div className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg animate-pulse">
                  Vedette
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
             <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl flex items-center gap-2 shadow-lg">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-secondary-dark truncate">{product.location || "Cameroun"}</span>
             </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/bien/${product.id}`}>
            <h3 className="text-lg font-bold text-secondary-dark hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center gap-4 py-4 border-b border-slate-50 mb-4">
          <div className="flex items-center gap-1.5 text-secondary">
            <Bed className="w-4 h-4" />
            <span className="text-xs font-medium">{product.beds || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Bath className="w-4 h-4" />
            <span className="text-xs font-medium">{product.baths || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 text-secondary">
            <Square className="w-4 h-4" />
            <span className="text-xs font-medium">{product.sqft || 0} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-black text-primary">
                {product.price.toLocaleString("fr-CM")} F CFA
            </span>
          </div>
          {!isAdmin && (
            <Button 
                size="sm" 
                onClick={() => onAddToCart(product)}
                className="rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Savoir plus
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;