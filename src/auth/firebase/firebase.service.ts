import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { FirebaseAdmin } from './interface/firebase-admin.interface';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: FirebaseAdmin;

  constructor(private readonly config: ConfigService) {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(
        require('../../../firebase-account.json'),
      ),
    });
  }

  async verifyToken(idToken: string): Promise<string> {
    return this.firebaseAdmin
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
