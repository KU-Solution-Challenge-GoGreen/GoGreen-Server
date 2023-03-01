import { Inject, Injectable } from '@nestjs/common';
import { FirebaseAdmin } from './interface/firebase-admin.interface';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FirebaseAdmin') private readonly firebaseAdmin: FirebaseAdmin,
  ) {}

  async getUsrIdByVerifyToken(idToken: string): Promise<string | null> {
    try {
      const decodedToken = await this.firebaseAdmin
        .auth()
        .verifyIdToken(idToken);
      return decodedToken.uid;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
