import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  private readonly firebase_app;

  constructor(private readonly config: ConfigService) {
    this.firebase_app = admin.initializeApp({
      credential: admin.credential.cert(require('../../firebase-account.json')),
    });
  }

  verifyToken(idToken: string): string | Promise<string> {
    return this.firebase_app
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        console.log(decodedToken);
        return uid;
      })
      .catch((error) => {
        console.log(error);
        return 'error';
      });
  }
}
