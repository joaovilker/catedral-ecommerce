import express, { Request, Response } from 'express'; // 1. Importamos os tipos aqui
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
// 2. Aplicamos os tipos aqui (e em todas as outras rotas)
app.get('/api', (request: Request, response: Response) => {
    return response.json({ message: 'API da Catedral no ar!' });
});

// Rota para BUSCAR todos os produtos
app.get('/api/products', async (request: Request, response: Response) => {
    try {
        const products = await prisma.product.findMany();
        return response.status(200).json(products);
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
});

// Rota para BUSCAR UM ÚNICO produto pelo seu ID
app.get('/api/products/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const product = await prisma.product.findUnique({ where: { id: id } });
        if (!product) {
            return response.status(404).json({ message: 'Produto não encontrado.' });
        }
        return response.status(200).json(product);
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar produto.' });
    }
});

// Rota para CRIAR um novo produto
app.post('/api/products', async (request: Request, response: Response) => {
    try {
        const { name, description, price, image, isNew } = request.body;
        const product = await prisma.product.create({
            data: { name, description, price, image, isNew }
        });
        return response.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return response.status(500).json({ message: 'Ocorreu um erro interno.' });
    }
});

// Exportamos o app para a Vercel usar.
export default app;
