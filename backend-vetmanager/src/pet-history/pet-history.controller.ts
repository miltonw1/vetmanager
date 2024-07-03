import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PetHistory, Prisma } from '@prisma/client';
import { PetHistoryService } from './pet-history.service';
import { PetHistoryDto, CreatePetHistoryDto, UpdatePetHistoryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express/';
import { diskStorage } from 'multer';
import { extname } from 'path/win32';

function toSchema(data: CreatePetHistoryDto | UpdatePetHistoryDto) {
	return {
		...data,
		weight: data.weight ? new Prisma.Decimal(data.weight) : null,
	} as PetHistory;
}

function fromSchema(schema: PetHistory) {
	return {
		...schema,
		weight: schema.weight ? Number(schema.weight) : null,
	} as PetHistoryDto;
}


// shallow

// GET pet/123/history
// POST pet/123/history
// GET pet/123/history/456


@Controller('pets/:pet_id/history')
export class PetHistoryController {
  constructor(private readonly petHistoryService: PetHistoryService) {}


  @Post()
  create(@Param('pet_id') petId: string, @Body() data: CreatePetHistoryDto): Promise<PetHistoryDto> {
    return this.petHistoryService.create(toSchema(data)).then(fromSchema);
  }

  @Get()
  findAll(@Param('pet_id') petId: string) {
    return this.petHistoryService.findAll(Number(petId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PetHistoryDto>{
    try {
			return await this.petHistoryService.findOne(Number(id)).then(fromSchema);
		} catch {
			throw new NotFoundException("History not found");
		}
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePetHistoryDto): Promise<PetHistoryDto> {
    try {
			return await this.petHistoryService.update(Number(id), toSchema(data)).then(fromSchema);
		} catch {
			throw new NotFoundException("History not found");
		}
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PetHistoryDto> {
    try {
			return await this.petHistoryService.remove(Number(id)).then(fromSchema);
		} catch {
			throw new NotFoundException("History not found");
		}
  }
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        const ext = extname(file.originalname);

        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;

        callback(null, filename)
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
  }

}
