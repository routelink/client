import auth from '@app/services/api/auth.ts';

export interface GetProfilePayload {
  idUser?: number;
}
export interface UpdateProfilePayload {
  currentPassword?: string;
  password?: string;
  name?: string;
}

export class ProfileService {
  getProfile(options?: GetProfilePayload) {
    return auth.get('/api/profile', { params: options });
  }

  updateProfile(options: UpdateProfilePayload) {
    return auth.patch('/api/profile', options);
  }
}
