import { IsIn } from "class-validator";

export class CreatePreferenceDto {
	@IsIn(["30d", "60d", "1y"])
	plan: "30d" | "60d" | "1y";
}
