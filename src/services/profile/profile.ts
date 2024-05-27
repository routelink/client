import api from '../api/api';

export class ProfileService {
  getProfile() {
    return api.get('/api/profile');
  }

  changeUserName(options: any) {
    return api.patch('/api/profile/username', options);
  }

  changePassword(options: any) {
    return api.patch('/api/profile/password', options);
  }
}
