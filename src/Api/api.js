import axios from 'axios';
import { resolve } from './resolve.js';
import {getToken} from "../Functions/functions";


var base_url = "https://amplify.sureclaim.in:3001"

var headers = {
    'Authorization': 'JWT '+localStorage.getItem('token')
}

export async function getCities(params){
	return await resolve(axios.get(base_url+ "/cities", {params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getAllCities(params){
	return await resolve(axios.get(base_url+ "/all-cities", {params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getLocalities(city_name){
	return await resolve(axios.get(base_url+ "/localities?city=" + city_name))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getCategories(city_name){
	return await resolve(axios.get(base_url+ "/categories"))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function submitHelp(params){
	return await resolve(axios.post(base_url+ "/submit-help", params, {headers: {'Authorization': 'JWT '+ getToken()}}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function generateOtp(mobile){
	return await resolve(axios.get(base_url+ "/generate-otp?mobile=" + mobile))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getLogin(params){
	return await resolve(axios.get(base_url+ "/login?mobile=" + params.mobile + "&otp="+params.otp))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getAllRequests(params){
	return await resolve(axios.get(base_url+ "/all-requests", {headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getRequestDetails(params, token){
	return await resolve(axios.get(base_url+ "/request", {headers: {'Authorization': 'JWT '+ localStorage.getItem('token')}, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function volunteerForRequest(params){
	return await resolve(axios.post(base_url+ "/volunteer",params, {headers: {'Authorization': 'JWT '+ localStorage.getItem('token')}}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getMyRequests(params){
	return await resolve(axios.get(base_url+ "/my-requests",{headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getMyFavs(params){
	return await resolve(axios.get(base_url+ "/my-favs",{headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function closeRequest(params){
	return await resolve(axios.get(base_url+ "/close",{headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function reOpenRequest(params){
	return await resolve(axios.get(base_url+ "/reopen",{headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function closeAdminRequest(params){
	return await resolve(axios.get(base_url+ "/close-admin",{headers: headers, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function updateName(params){
	return await resolve(axios.get(base_url+ "/updatename",{headers: {'Authorization': 'JWT '+ localStorage.getItem('token')}, params: params}))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getStates(data){
	return await resolve(axios.get(base_url+ "/states"))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getBloodGroups(data){
	return await resolve(axios.get(base_url+ "/blood-groups"))
	.then(response => response.data.data)
	.catch(error => error)
}

export async function getHomeDetails(data){
	return await resolve(axios.get(base_url+ "/home"))
	.then(response => response.data.data)
	.catch(error => error)
}
