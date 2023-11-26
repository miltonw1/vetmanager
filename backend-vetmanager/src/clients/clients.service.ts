import { Injectable } from "@nestjs/common";
import { Client } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private prisma: PrismaService) {}

	getAllClients(): Promise<Client[]> {
		return this.prisma.client.findMany();
	}

	getClientById(id: number): Promise<Client> {
		return this.prisma.client.findUnique({
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
}
