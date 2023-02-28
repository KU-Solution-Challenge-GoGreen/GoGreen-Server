import * as admin from 'firebase-admin';

export interface FirebaseAdmin {
  auth(): admin.auth.Auth;
}
