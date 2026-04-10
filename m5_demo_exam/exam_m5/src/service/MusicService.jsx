import axios from "axios";

const BE_URL = "http://localhost:8080";

export async function findAll() {
    try {
        const res = await axios.get(`${BE_URL}/musics`);
        return res.data;
    }catch (e) {
        console.log(e);
        return [];
    }
}
export async function addNew(music) {
    try {
        const res = await axios.post(`${BE_URL}/musics`,music);
        if (res.status===201) return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

export async function publicMusic(music) {
    try {
        const res = await axios.put(`${BE_URL}/musics/${music.id}`,music);
        if (res.status===200) return true;
    }catch (e) {
        console.log(e);
        return false;
    }
}

export async function searchName(searchName) {
    try {
        const res = await axios.get(`${BE_URL}/musics?name_like=${searchName}`);
        return res.data;
    }catch (e) {
        console.log(e);
        return null
    }
}

