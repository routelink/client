import { api } from '@app/services';

export interface GetProfilePayload {
  idUser?: number;
}
export interface UpdateProfilePayload {
  currentPassword?: string;
  password?: string;
  username?: string;
}

export class ProfileService {
  getProfile(options?: GetProfilePayload) {
    return api.get('/api/profile', { params: options });
  }

  updateProfile(options: UpdateProfilePayload) {
    return api.patch('/api/profile', options);
  }
}
