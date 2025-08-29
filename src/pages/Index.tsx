import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";
import dress1 from "@/assets/dress-1.jpg";
import blouse1 from "@/assets/blouse-1.jpg";
import skirt1 from "@/assets/skirt-1.jpg";

const Index = () => {
  const trendingProducts = [
    {
      id: "1",
      name: "Vestido de Verão Elegante",
      price: 99,
      originalPrice: 149,
      image: dress1,
      isNew: true,
      colors: ["#ffffff", "#f5f5dc", "#e6e6fa"]
    },
    {
      id: "2",
      name: "Blusa Casual Bege",
      price: 79,
      image: blouse1,
      colors: ["#f5e6d3", "#e8dcc6", "#d3c4a0"]
    },
    {
      id: "3",
      name: "Saia Midi Primavera",
      price: 129,
      image: skirt1,
      colors: ["#ffffff", "#f0f0f0", "#e8e8e8"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-foreground leading-tight">
                  Veja nossa nova{" "}
                  <span className="text-primary">coleção</span>
                </h1>
                <p className="text-lg text-muted-foreground font-inter max-w-md">
                  Descubra peças únicas que combinam elegância e conforto para o seu dia a dia.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="font-poppins">
                  Explorar Coleção
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="shop" size="lg" className="font-poppins">
                  Ver Lookbook
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroBanner} 
                alt="Nova Coleção" 
                className="w-full rounded-2xl shadow-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offer */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground">
              Vestidos de Verão a partir de{" "}
              <span className="text-primary">R$ 99</span>
            </h2>
            <p className="text-muted-foreground font-inter text-lg max-w-2xl mx-auto">
              Aproveite nossa coleção especial de verão com descontos imperdíveis em peças selecionadas.
            </p>
            <Button variant="default" size="lg" className="font-poppins">
              Ver Ofertas
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground">
                Trending Now
              </h2>
              <p className="text-muted-foreground font-inter">
                Os produtos mais populares desta semana
              </p>
            </div>
            
            <Button variant="ghost" className="hidden sm:flex items-center">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map((product) => (
              <a href="/product/1" key={product.id}>
                <ProductCard {...product} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-poppins font-bold text-foreground">
              O que nossos clientes dizem
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { name: "Ana Silva", rating: 5, comment: "Qualidade excepcional e atendimento perfeito!" },
                { name: "Maria Santos", rating: 5, comment: "Peças lindas e muito confortáveis. Recomendo!" },
                { name: "Julia Costa", rating: 5, comment: "Minha loja favorita para looks elegantes." }
              ].map((review, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-soft">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-inter mb-4">"{review.comment}"</p>
                  <p className="font-poppins font-medium text-foreground">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
