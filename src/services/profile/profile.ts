import auth from '@app/services/api/auth.ts';

export interface ProfileParam {
  idUser?: number;
}

export class ProfileService {
  getProfile(options?: ProfileParam) {
    return auth.get('/users/1', { params: options });
  }
}
