import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException} from "@nestjs/common";
import { ClientService } from "./clients.service";
import { Client } from "@prisma/client"
import { ClientDto } from "./dto/client.dto/client.dto";

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() data: Client) {
       return this.clientService.createClient(data)
    }

    // @Post()
    // async createClient(clientDto: ClientDto) {
    //    return this.clientService.createClient(clientDto)
    // }

    @Get()
    async getAllClients(){
        return this.clientService.getAllClients()
    }

    @Get(':id')
    async getClientById(@Param('id') id:string){
        const clientFound = await this.clientService.getClientById(Number(id))
        if (!clientFound) throw new NotFoundException('Client not found')
        return clientFound
    }

    @Delete(':id')
    async deleteClient(@Param('id') id:string){
        try{
            return await this.clientService.deleteClient(Number(id))
        }   catch (error){
            throw new NotFoundException("Client does not exist")
        }
    }

    @Put(':id')
    async updateClient(@Param('id') id:string, @Body() data: Client){
        try {
            return await this.clientService.updateClient(Number(id), data)
        }   catch (error){
            throw new NotFoundException("Client does not exist")
        }
    }
}