import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Root API')
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  getHello(): string {
    return 'Hello GoGreen!';
  }
}
