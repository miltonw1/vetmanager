import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Client } from "@prisma/client";

@Injectable()


export class ClientService {

    constructor(private prisma: PrismaService) { }

    async getAllClients(): Promise<Client[]> {
        return this.prisma.client.findMany();
    }

    async getClientById(id: number): Promise<Client> {
        return this.prisma.client.findUnique({
            where: {
                id
            }
        });
    }

    async createClient(data: Client): Promise<Client> {
        return this.prisma.client.create({
            data
        })
    }

    async updateClient(id: number, data: Client): Promise<Client> {
        return this.prisma.client.update({
            where: {
                id
            },
            data
        })
    }

    async deleteClient(id: number): Promise<Client> {
        return this.prisma.client.delete({
            where: {
                id
            }
        })
    }

}