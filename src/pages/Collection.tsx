import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { Link } from "react-router-dom"; // Import Link for navigation

// Função de busca ATUALIZADA
const fetchProducts = async (): Promise<Product[]> => {
    const apiUrl = import.meta.env.VITE_API_URL; // Lê /api do .env
    const response = await fetch(`${apiUrl}/products`); // Faz a chamada para /api/products
    if (!response.ok) {
        throw new Error('Não foi possível buscar os produtos.');
    }
    return response.json();
};

const CollectionPage = () => {
    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-12 lg:py-16">
                {/* ... o resto do seu componente continua igual ... */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-foreground">Nossa Coleção</h1>
                    <p className="text-lg text-muted-foreground font-inter mt-4 max-w-2xl mx-auto">Explore todas as nossas peças. Encontre looks que expressam seu estilo único.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="col-span-1">
                        <div className="sticky top-24 p-6 bg-muted rounded-lg shadow-soft">
                            <h3 className="text-xl font-poppins font-semibold mb-6">Filtros</h3>
                            <div className="space-y-4">
                                <h4 className="font-inter font-medium text-foreground">Categoria</h4>
                                <div className="space-y-3">
                                    <Button variant="ghost" className="w-full justify-start">Todos</Button>
                                    <Button variant="ghost" className="w-full justify-start">Vestidos</Button>
                                    <Button variant="ghost" className="w-full justify-start">Blusas</Button>
                                    <Button variant="ghost" className="w-full justify-start">Saias</Button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="col-span-1 lg:col-span-3">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-sm text-muted-foreground font-inter">Mostrando {products?.length || 0} produtos</p>
                            <Select>
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Padrão</SelectItem>
                                    <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                                    <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                                    <SelectItem value="newest">Mais Recentes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {isLoading && <p className="text-center font-inter">Carregando produtos...</p>}
                        {error && <p className="text-center font-inter text-destructive">Ocorreu um erro ao buscar os produtos.</p>}
                        {products && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product: Product) => (
                                    // Usando Link em vez de <a> para navegação interna do React
                                    <Link to={`/product/${product.id}`} key={product.id}>
                                        <ProductCard {...product} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollectionPage;
