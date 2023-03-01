import { Module } from '@nestjs/common';
import { configModule } from 'src/app/modules/config.module';
import { FirebaseService } from './firebase.service';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Module({
  imports: [configModule],
  providers: [
    FirebaseService,
    {
      provide: 'FirebaseAdmin',
      useFactory: async (configService: ConfigService) => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: configService.get('FIREBASE_PROJECT_ID'),
            privateKey: configService
              .get<string>('FIREBASE_PRIVATE_KEY')!
              .replace(/\\n/g, '\n'),
            clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
          }),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
