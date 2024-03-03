import { Injectable } from "@nestjs/common";
import { Client } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private prisma: PrismaService) {}

	getAllClients(): Promise<Client[]> {
		return this.prisma.client.findMany();
	}

	getClientById(id: number): Promise<Client> {
		return this.prisma.client.findUniqueOrThrow({
			where: {
				id,
			},
		});
	}

	createClient(data: Client): Promise<Client> {
		return this.prisma.client.create({
			data,
		});
	}

	updateClient(id: number, data: Client): Promise<Client> {
		return this.prisma.client.update({
			where: {
				id,
			},
			data,
		});
	}

	deleteClient(id: number): Promise<Client> {
		return this.prisma.client.delete({
			where: {
				id,
			},
		});
	}

	async petsFromClient(id: number) {
		const pets = await this.prisma.client.findUniqueOrThrow({ where: { id } }).pets();

		return pets;
	}

}
