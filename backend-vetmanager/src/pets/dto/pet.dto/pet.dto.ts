export class PetDto {
	id: number;
	name: string;
	allergies: string;
	genre: string | null;
	birthday: Date | null;
	blood_type: string | null;
	life_status: string;
	race_id: number | null;
	species_id: number;
	client_id: number;
	weight: number | null;
}
