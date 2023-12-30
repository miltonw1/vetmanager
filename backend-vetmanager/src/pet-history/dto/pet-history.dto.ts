export class PetHistoryDto {
    id: number;
    diagnostic: string;
    observation?: string;
    weight?: number;
    // images
    created_at: Date
}