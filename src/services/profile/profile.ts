import auth from '@app/services/api/auth.ts';

export interface ProfileParam {
  idUser?: number;
}

export class ProfileService {
  getProfile(options?: ProfileParam) {
    return api.get('/api/profile', { params: options });
  }

  updateProfile(options: any) {
    return api.patch('/api/profile', options);
  }
}
