import { useState } from "react";
import { ArrowLeft, Heart, Share2, Star, Truck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ColorSelector from "@/components/ColorSelector";
import SizeSelector from "@/components/SizeSelector";
import dress1 from "@/assets/dress-1.jpg";

const Product = () => {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: "Branco", value: "#ffffff" },
    { name: "Bege", value: "#f5f5dc" },
    { name: "Lavanda", value: "#e6e6fa" }
  ];

  const sizes = ["PP", "P", "M", "G", "GG"];

  const productImages = [dress1, dress1, dress1]; // Simulating multiple views

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <span>/</span>
          <span>Vestidos</span>
          <span>/</span>
          <span className="text-foreground">Vestido de Verão Elegante</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img 
                src={dress1} 
                alt="Vestido de Verão Elegante"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden bg-muted border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                  <img 
                    src={image} 
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Novo</Badge>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">
                  Vestido de Verão Elegante
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(24 avaliações)</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-poppins font-bold text-foreground">
                    R$ 99
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    R$ 149
                  </span>
                  <Badge variant="destructive">33% OFF</Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground font-inter leading-relaxed">
                Vestido elegante e confortável, perfeito para os dias quentes de verão. 
                Confeccionado em tecido leve e respirável, oferece movimento e estilo para qualquer ocasião.
              </p>
            </div>

            {/* Color Selection */}
            <ColorSelector 
              colors={colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            {/* Size Selection */}
            <SizeSelector 
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Quantity */}
            <div className="space-y-3">
              <h4 className="text-sm font-inter font-medium text-foreground">Quantidade</h4>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button size="lg" className="w-full font-poppins">
                Adicionar ao Carrinho
              </Button>
              <Button variant="outline" size="lg" className="w-full font-poppins">
                Comprar Agora
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-inter">Frete grátis acima de R$ 150</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RefreshCw className="h-5 w-5 text-primary" />
                <span className="font-inter">Troca grátis em até 30 dias</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-inter">Compra segura e protegida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;