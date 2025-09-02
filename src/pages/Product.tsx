import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Heart, Share2, Star, Truck, RefreshCw, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ColorSelector from "@/components/ColorSelector";
import SizeSelector from "@/components/SizeSelector";
import { Product } from "@/types";

// Função de busca ATUALIZADA
const fetchProductById = async (productId: string): Promise<Product> => {
  const apiUrl = import.meta.env.VITE_API_URL; // Lê /api do .env
  const response = await fetch(`${apiUrl}/products/${productId}`); // Faz a chamada para /api/products/:id
  if (!response.ok) {
    throw new Error('Não foi possível buscar os dados do produto.');
  }
  return response.json();
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const colors = [{ name: "Branco", value: "#ffffff" }, { name: "Bege", value: "#f5f5dc" }, { name: "Lavanda", value: "#e6e6fa" }];
  const sizes = ["PP", "P", "M", "G", "GG"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center font-inter">Carregando produto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 text-center font-inter text-destructive">
          Ocorreu um erro ou o produto não foi encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/collection" className="flex items-center hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Coleção
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {product.isNew && <Badge variant="secondary">Novo</Badge>}
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-poppins font-bold text-foreground">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <p className="text-muted-foreground font-inter leading-relaxed">{product.description}</p>
            </div>
            <ColorSelector colors={colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />
            <SizeSelector sizes={sizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            <div className="space-y-3">
              <h4 className="text-sm font-inter font-medium text-foreground">Quantidade</h4>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Button size="lg" className="w-full font-poppins">Adicionar ao Carrinho</Button>
              <Button variant="outline" size="lg" className="w-full font-poppins">Comprar Agora</Button>
            </div>
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-3 text-sm"><Truck className="h-5 w-5 text-primary" /><span className="font-inter">Frete grátis acima de R$ 150</span></div>
              <div className="flex items-center space-x-3 text-sm"><RefreshCw className="h-5 w-5 text-primary" /><span className="font-inter">Troca grátis em até 30 dias</span></div>
              <div className="flex items-center space-x-3 text-sm"><Shield className="h-5 w-5 text-primary" /><span className="font-inter">Compra segura e protegida</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
