import axios from "axios";

const BE_URL = "http://localhost:3000"

export async function getAll() {
    try {
        const res = await axios.get(`${BE_URL}/positions`);
        return res.data;
    }catch (e) {
        console.log(e)
    }
    return [];
}