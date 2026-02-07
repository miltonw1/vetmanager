import { Injectable } from "@nestjs/common";
import { Client } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ClientService {
	constructor(private prisma: PrismaService) {}

	getAllClients(userId: number): Promise<Client[]> {
		return this.prisma.client.findMany({
			where: { user_id: userId }
		});
	}

	getClientById(id: number, userId: number): Promise<Client> {
		return this.prisma.client.findFirstOrThrow({
			where: {
				id,
				user_id: userId
			},
		});
	}

	createClient(data: Partial<Client>, userId: number): Promise<Client> {
		return this.prisma.client.create({
			data: {
				...data,
				user_id: userId
			} as Client,
		});
	}

	async updateClient(id: number, data: Partial<Client>, userId: number): Promise<Client> {
		const client = await this.prisma.client.findFirst({
		  where: { id, user_id: userId },
		  select: { debt: true },
		});


		if (!client) throw new Error("Cliente no encontrado");

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { id: _, user_id: __, ...updateData } = data as any;


		const updatedClient = await this.prisma.client.update({
		  where: { id, user_id: userId },
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


	deleteClient(id: number, userId: number): Promise<Client> {
		return this.prisma.client.delete({
			where: {
				id,
				user_id: userId
			},
		});
	}

	async petsFromClient(id: number, userId: number) {
		const client = await this.prisma.client.findFirstOrThrow({ 
			where: { id, user_id: userId },
			include: { pets: true }
		});

		return client.pets;
	}

}
