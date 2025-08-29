// backend/src/server.ts

console.log('--- Servidor iniciado com configuração CORS! ---');

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middlewares: devem vir antes das rotas
app.use(express.json());
app.use(cors());

// Rota de teste
app.get('/', (request, response) => {
    return response.json({ message: 'API da Catedral no ar!' });
});

// Rota para BUSCAR todos os produtos
app.get('/products', async (request, response) => {
    try {
        const products = await prisma.product.findMany();
        console.log(`✅ [GET /products] ${products.length} produtos encontrados.`);
        return response.status(200).json(products);
    } catch (error) {
        console.error('❌ [GET /products] Erro ao buscar produtos:', error);
        return response.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
});

// Rota para CRIAR um novo produto
app.post('/products', async (request, response) => {
    console.log('✅ [POST /products] Requisição recebida!');
    try {
        const { name, description, price, image, isNew } = request.body;
        console.log('📦 Dados recebidos:', request.body);
        const product = await prisma.product.create({
            data: { name, description, price, image, isNew }
        });
        console.log('✅ Produto criado com sucesso no banco de dados:', product);
        return response.status(201).json(product);
    } catch (error) {
        console.error('❌ [POST /products] Erro ao criar produto:', error);
        return response.status(500).json({
            message: 'Ocorreu um erro interno no servidor ao tentar criar o produto.'
        });
    }
});

// Inicia o servidor
app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!');
});