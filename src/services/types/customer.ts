export interface ChangePasswordPayload {
  newPassword: string;
}

export interface UpdateProfilePayload {
  name: string;
  phoneNumber: string;
  birthday: string;
  gender: string;
}

export interface VerifyPhoneNumberPayload {
  phoneNumber: string;
}

export interface AddressPayload {
  name: string;
  phoneNumber: string;
  detail: string;
  city: string;
  district: string;
  ward: string;
}

export interface RemoveAddressPayload {
  _id: string;
}

export interface UpdateAddressToDefaultPayload {
  _id: string;
}
