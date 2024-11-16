import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { PetHistory, PetHistoryImage, Prisma } from '@prisma/client';
import { PetHistoryService } from './pet-history.service';
import { ImageHistoryService } from './image-history.service';
import { PetHistoryDto, CreatePetHistoryDto, UpdatePetHistoryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express/';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from "../session/guards/jwt.guard";
import path from 'node:path';
import fs from 'node:fs';

const IMAGES_PATH = './public/images/histories';




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

@UseGuards(JwtAuthGuard)
@Controller('pets/:pet_id/history')
export class PetHistoryController {
  constructor(
    private readonly petHistoryService: PetHistoryService,
    private readonly imageHistoryService: ImageHistoryService,
  ) {}


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


  @Post(':id/images')
  @UseInterceptors(
    FileInterceptor('file', {
    storage: diskStorage({
      destination: IMAGES_PATH,
      filename: (req, file, callback) => {

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        const ext = path.extname(file.originalname);

        const petPath = path.join(IMAGES_PATH, req.params.pet_id);
        if (!fs.existsSync(petPath)) {
          fs.mkdirSync(petPath);
        }

        const filename = path.join(req.params.pet_id, `${uniqueSuffix}${ext}`);

        callback(null, filename)
      }
    })
  }))
  async uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const filePath = file.path
    const filePathSplit = filePath.split("\\").slice(1)
    const pathUrl = process.env.BASE_URL + filePathSplit.join("/")
    const result = await this.imageHistoryService.create({pet_history_id: Number(id), image_src: file.path, image_url: pathUrl} as PetHistoryImage);
    //console.log(result)
  }
}
