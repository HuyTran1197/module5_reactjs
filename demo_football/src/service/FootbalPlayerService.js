import axios from "axios";

const BE_URL = "http://localhost:3000";

export async function getList() {
    try {
        const res = await axios.get(`${BE_URL}/players`);
        return res.data;
    }catch (e) {
        console.log(e)
    }
    return [];
}

export async function deleteById(id) {
    if (id === undefined || id === null) return false;
    try {
        const res = await axios.delete(`${BE_URL}/players/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function addNew(player) {
    try {
        const res = await axios.post(`${BE_URL}/players`,player);
        if (res.status=="201") return true;
    }catch (e) {
        console.log(e)
    }
    return false;
}

export async function findById(id) {
    try {
        const res = await axios.get(`${BE_URL}/players/${id}`);
        return res.data;
    }catch (e) {
        console.log(e)
    }
    return null;
}


