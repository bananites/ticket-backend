
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {
  @ApiProperty({
    required: true,
    default: 'example@example.de',
  })
  email: string;

  @ApiProperty({
    required: true,
    default: 'password123!',
  })
  refreshToken: string
}
