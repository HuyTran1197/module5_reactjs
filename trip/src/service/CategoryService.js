import axios from "axios";

const url = "/data/db.json";

export async function getAll(){
    try {
        const res = await axios.get(url);
        return res.data.categories;
    }catch (e) {
        console.log(e);
        return [];
    }
}