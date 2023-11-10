import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ClientService } from "./clients.service";
import { Client } from "@prisma/client"

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() data: Client) {
        this.clientService.createClient(data)
    }

    @Get()
    async getAllClients(){
        this.clientService.getAllClients()
    }

    @Get(':id')
    async getClientById(@Param('id') id:string){
        this.clientService.getClientById(Number(id))
    }

    @Delete(':id')
    async deleteClient(@Param('id') id:string){
        this.clientService.deleteClient(Number(id))
    }

    @Put(':id')
    async updateClient(@Param('id') id:string, @Body() data: Client){
        this.clientService.updateClient(Number(id), data)
    }
}