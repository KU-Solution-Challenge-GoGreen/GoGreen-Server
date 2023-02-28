import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello GoGreen!\t';
  }
  getLogined(): string {
    return 'Logined GoGreen!\t';
  }
  getInput(input: string): string {
    return 'Hello GoGreen!\t' + input;
  }
}
