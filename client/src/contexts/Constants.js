export const apiUrl = process.env.NODE_ENV === 'production' ? 'something else' : 'http://localhost:3333/api';
export const apiUrlAuth = process.env.NODE_ENV === 'production' ? 'something else' : 'http://localhost:4444/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'sound-clone';
export const LOCAL_STORAGE_FULLNAM = 'fullname-user';