import { api } from '@app/services';

export class ProfileService {
  getProfile() {
    return api.get('/api/profile');
  }

  changeUsername(options: { username: string }) {
    return api.patch('/api/profile/username', options);
  }

  changePassword(options: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    return api.patch('/api/profile/password', options);
  }
}
