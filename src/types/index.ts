export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isNew: boolean;
    createdAt: string; // O Prisma envia datas como strings no formato ISO
    updatedAt: string;
}