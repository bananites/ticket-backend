
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {

  @ApiProperty({
    required: true
  })
  req: any

}
