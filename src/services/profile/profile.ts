import api from '../api/api';

export interface ProfileParam {
  idUser?: number;
}

export class ProfileService {
  getProfile(options?: ProfileParam) {
    return api.get('/users/1', { params: options });
  }
}
