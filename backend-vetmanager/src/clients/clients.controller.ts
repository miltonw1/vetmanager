import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Client } from "@prisma/client";
import { ClientService } from "./clients.service";
import { ClientDto, CreateClientDto, UpdateClientDto } from "./dto/client.dto";
import { JwtAuthGuard } from "../session/guards/jwt.guard";


@UseGuards(JwtAuthGuard)
@Controller("clients")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	createClient(@Body() data: CreateClientDto): Promise<ClientDto> {
		return this.clientService.createClient(data as Client);
	}

	@Get()
	getAllClients(): Promise<ClientDto[]> {
		return this.clientService.getAllClients();
	}

	@Get(":id")
	async getClientById(@Param("id") id: string): Promise<ClientDto> {
		try {
			return await this.clientService.getClientById(Number(id));
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Delete(":id")
	async deleteClient(@Param("id") id: string): Promise<ClientDto> {
		try {
			return await this.clientService.deleteClient(Number(id));
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Put(":id")
	async updateClient(@Param("id") id: string, @Body() data: UpdateClientDto): Promise<ClientDto> {
		try {
			return await this.clientService.updateClient(Number(id), data as Client);
		} catch {
			throw new NotFoundException("Client not found");
		}
	}

	@Get(":clientId/pets")
	findAllPets(@Param("clientId") clientId: string) {
		return this.clientService.petsFromClient(Number(clientId));
	}
}
