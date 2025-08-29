// 1. Importe o 'createPortal' do 'react-dom'
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
    onClose: () => void;
}

export const MobileNav = ({ onClose }: MobileNavProps) => {
    // 2. Armazenamos o JSX do menu em uma variável
    const menuContent = (
        // O conteúdo é o mesmo de antes
        <div
            // A classe z-[60] ainda é uma boa prática para garantir a sobreposição
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background md:hidden"
            onClick={onClose}
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-foreground"
                onClick={onClose}
            >
                <X className="h-6 w-6" />
            </Button>

            <nav
                className="flex flex-col items-center space-y-8"
                onClick={(e) => e.stopPropagation()}
            >
                <a href="/" onClick={onClose} className="text-xl font-inter font-medium text-foreground hover:text-primary transition-colors">Início</a>
                <a href="/collection" onClick={onClose} className="text-xl font-inter font-medium text-muted-foreground hover:text-primary transition-colors">Coleção</a>
                <a href="/about" onClick={onClose} className="text-xl font-inter font-medium text-muted-foreground hover:text-primary transition-colors">Sobre</a>
                <a href="/contact" onClick={onClose} className="text-xl font-inter font-medium text-muted-foreground hover:text-primary transition-colors">Contato</a>
            </nav>
        </div>
    );

    // 3. Usamos o createPortal para "teletransportar" o menu para o final do <body>
    return createPortal(menuContent, document.body);
};