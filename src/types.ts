export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: number;
  createdAt: string;
  updatedAt: string;
};

export type TRegisterReq = {
    name: string;
    email: string;
    password: string;
}

export type TRegisterRes = {
    success: boolean;
    newUser: TUser;
}

export type TLoginReq = {
    email: string;
    password: string;
}

export type TLoginRes = {
    success: boolean;
    user: TUser;
    accessToken: string;
}

export type TLoadUserRes = {
    success: boolean;
    user: TUser;
}

export type TUpdateUserInfoReq = {
    name: string;
    email: string;
}

export type TUpdateUserPwdReq = {
    oldPassword: string;
    newPassword: string;
}

export type TUpdateUserRoleReq = {
    id: string;
    role: number;
}

export type TDeleteUserRes = {
    success: boolean;
    message: string;
}

export type TGetUsersRes = {
    success: boolean;
    users: TUser[];
}