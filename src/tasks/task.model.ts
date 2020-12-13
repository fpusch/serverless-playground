import { IsNotEmpty } from 'class-validator';

export class Task {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  content: string;
}
