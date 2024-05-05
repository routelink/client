import { action, makeObservable, observable } from 'mobx';

import avatar from '@app/assets/iivanov.jpg';
import { IUser } from '@app/models';

export class ProfileStore {
    loading = true;
    data: IUser = {
        id: 1,
        username: '',
        email: '',
        avatar: '',
    };
    private readonly profileService = new ProfileService();

    constructor() {
        makeObservable(this, {
            loading: observable,
            data: observable,
            getProfile: action,
            changeName: action,
            changeAvatar: action,
        });
    }

    getProfile(): any {
        this.loading = true;
        this.data = {
            id: 1,
            username: 'Alexander M.Barmin',
            email: 'ambarmin@vniief.ru',
            avatar: avatar,
        };
    }

    setLoading(status: boolean) {
        this.loading = status;
    }

    changeName(name: string): any {
        this.loading = true;
        this.data.username = name;
    }

    changeAvatar(avatar: string): any {
        this.loading = true;
        this.data.avatar = avatar;
    }
}