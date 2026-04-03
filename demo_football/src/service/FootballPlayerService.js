import axios from "axios";

const BE_URL = "http://localhost:8080";

export async function findAll() {
    try {
        const res = await axios.get(`${BE_URL}/players`);
        return res.data;
    }catch (e) {
        console.log(e);
    }
    return [];
}

export async function findById(id) {
    try {
        const res = await axios.get(`${BE_URL}/players/${id}`);
        return res.data;
    }catch (e) {
        console.log(e);
    }
    return null;
}

export async function addNew(player) {
    try {
        const res = await axios.post(`${BE_URL}/players`,player);
        if (res.status===201) return true;
    }catch (e) {
        console.log(e);
    }
    return false;
}

export async function editPlayer(player) {
    try {
        const res = await axios.put(`${BE_URL}/players/${player.id}`,player);
        if (res.status===200) return true;
    }catch (e) {
        console.log(e);
    }
    return false;
}

export async function deleteById(id) {
    try {
        const res = await axios.delete(`${BE_URL}/players/${id}`);
        if (res.status===200) return true;
    }catch (e) {
        console.log(e);
    }
    return false;
}

export async function searchPlayer(searchCode,searchName,searchPosition) {
    try {
        if (!searchCode && !searchName && !searchPosition){
            return await findAll();
        }
        const listSearch = [];
        if (searchCode) listSearch.push(`playerCode_like=${searchCode}`);
        if (searchName) listSearch.push(`name_like=${searchName}`);
        if (searchPosition) listSearch.push(`position.id=${searchPosition}`);

        const stringJoin = `${BE_URL}/players?${listSearch.join('&')}`;
        const res = await axios.get(stringJoin);
        return res.data;
    }catch (e) {
        console.log(e);
    }
    return null;
}

