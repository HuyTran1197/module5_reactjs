import axios from "axios";

const BE_URL = "http://localhost:8080";

export async function searchMusic(searchName,searchSingle,status,page) {
    let url = `${BE_URL}/musics?_page=${page}&_limit=3`;
    if (searchName){
        url += `&name_like=${searchName}`;
    }
    if (searchSingle){
        url += `&singleMan_like=${searchSingle}`;
    }
    if (status){
        url += `&status_like=${status}`;
    }

    try {
        const res = await axios.get(url);
        const data = res.data;
        const totalPage = res.headers['x-total-count'];
        return {data,totalPage};
    }catch (e) {
        console.log(e);
        return {
            data: [],
            totalPage:0
        };
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


