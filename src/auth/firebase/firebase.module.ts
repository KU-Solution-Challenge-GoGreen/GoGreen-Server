import { Module } from '@nestjs/common';
import { configModule } from 'src/app/modules/config.module';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [configModule],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
