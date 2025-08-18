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

	async updateClient(id: number, data: Partial<Client>, userId: number): Promise<Client> {
		const client = await this.prisma.client.findUnique({
		  where: { id },
		  select: { debt: true },
		});


		if (!client) throw new Error("Cliente no encontrado");

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: _, ...updateData } = data;


		const updatedClient = await this.prisma.client.update({
		  where: { id },
		  data: updateData,
		});

		try {
			await this.prisma.debtLog.create({
			  data: {
				client_id: id,
				user_id: userId,
				previous_debt: client.debt ?? "0",
				new_debt: updatedClient.debt ?? "0",
			  },
			});
		  } catch (error) {
			console.error("Error al crear el log de deuda:", error);
			throw new Error("Error al registrar el cambio de deuda");
		  }

		return updatedClient;
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
