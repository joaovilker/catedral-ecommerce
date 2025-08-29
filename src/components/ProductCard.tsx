import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  colors?: string[];
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  isNew, 
  colors = [] 
}: ProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        {isNew && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
              Novo
            </span>
          </div>
        )}
        
        {/* Wishlist */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
        
        {/* Colors */}
        {colors.length > 0 && (
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {colors.map((color, index) => (
              <div 
                key={index}
                className="w-3 h-3 rounded-full border border-background shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-inter font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-poppins font-semibold text-foreground">
            R$ {price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;