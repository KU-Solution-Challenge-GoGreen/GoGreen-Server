import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdmin } from './interface/firebase-admin.interface';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FirebaseAdmin') private readonly firebaseAdmin: FirebaseAdmin,
  ) {}

  async getUsrIdByVerifyToken(idToken: string): Promise<string> {
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
