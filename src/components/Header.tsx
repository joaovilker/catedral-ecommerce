// 1. Importe o useState e useEffect do React
import { useState, useEffect } from "react";
import { ShoppingBag, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
// 4. Importaremos o componente que vamos criar
import { MobileNav } from "./MobileNav";

const Header = () => {
  // 2. Crie o estado para controlar o menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 5. (Bônus) Efeito para travar o scroll da página quando o menu estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Função de limpeza para garantir que o overflow volte ao normal se o componente for desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  return (
    // Adicione um `relative` aqui para um contexto de posicionamento, se necessário no futuro
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-poppins font-bold text-foreground">
            Catedral
          </h1>
        </div>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-sm font-inter font-medium text-foreground hover:text-primary transition-colors">
            Início
          </a>
          <a href="/collection" className="text-sm font-inter font-medium text-muted-foreground hover:text-primary transition-colors">
            Coleção
          </a>
          <a href="/about" className="text-sm font-inter font-medium text-muted-foreground hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="/contact" className="text-sm font-inter font-medium text-muted-foreground hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
          {/* 3. Adicione o evento de clique para alternar o estado do menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 4. Renderize o menu mobile condicionalmente */}
      {isMenuOpen && <MobileNav onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
};

export default Header;