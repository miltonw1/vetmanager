import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Client } from "@prisma/client";
import { ClientService } from "./clients.service";
import { ClientDto, CreateClientDto, UpdateClientDto } from "./dto/client.dto";
import { JwtAuthGuard } from "../session/guards/jwt.guard";
import { User } from "../session/decorators/user.decorator";
import { ActiveUser } from "../session/interfaces/active-user.interface";


@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	createClient(@Body() data: CreateClientDto, @User() user: ActiveUser): Promise<ClientDto> {
		return this.clientService.createClient(data as Client, user.userId);
	}

	@Get()
	getAllClients(@User() user: ActiveUser): Promise<ClientDto[]> {
		return this.clientService.getAllClients(user.userId);
	}

	@Get(":id")
	async getClientById(@Param("id") id: string, @User() user: ActiveUser): Promise<ClientDto> {
		try {
			return await this.clientService.getClientById(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Delete(":id")
	async deleteClient(@Param("id") id: string, @User() user: ActiveUser): Promise<ClientDto> {
		try {
			return await this.clientService.deleteClient(Number(id), user.userId);
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Put(":id")
	async updateClient(@Param("id") id: string, @Body() data: UpdateClientDto, @User() user: ActiveUser): Promise<ClientDto> {
		try {
			return await this.clientService.updateClient(Number(id), data as Client, user.userId);
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Get(":clientId/pets")
	findAllPets(@Param("clientId") clientId: string, @User() user: ActiveUser) {
		return this.clientService.petsFromClient(Number(clientId), user.userId);
	}
}
