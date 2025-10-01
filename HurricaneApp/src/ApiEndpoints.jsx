import React from 'react'
import axios from 'axios'
const baseurl = 'https://localhost:9090';

const ApiEndpoints = {
	GetDefault: () => { return Get(`${baseurl}/hurricaneinfo/default`) },
	GetStormsFromArea: async (area) => { return await Post(`${baseurl}/hurricaneinfo/all`, area) },
	GetStormById: async (id) => {return await Get(`${baseurl}/hurricaneinfo/${id}`)},
}

async function Get(url) {
	try {
		var result = await axios.get(url)
			.then((response) => {
				return response.data;
			})
	}
	catch (error) {
		console.log('Error fetching data: Please double check that API is running and DB connection', error);
	}
	return result;
}

async function Post(url, body) {
	try {
		var result = await axios.post(url, body)
			.then((response) => {
				return response.data;
			})
	}
	catch {
		console.log('Error fetching data: Please double check that API is running and DB connection', error);
	}
	return result;
}

export default ApiEndpoints



