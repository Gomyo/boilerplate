import axios from 'axios';
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {

	const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) =>  response.data)

	return {
		type: LOGIN_USER,
		payload: request
	}
}

export function registerUser(dataToSubmit) {

	const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) =>  response.data)

	return {
		type: REGISTER_USER,
		payload: request
	}
}

export function auth() {

	// get method이기 때문에 body 부분은 필요가 없음(dataToSubmit)
	const request = axios
	.get('/api/users/auth')
    .then((response) =>  response.data)

	return {
		type: AUTH_USER,
		payload: request
	}
}
