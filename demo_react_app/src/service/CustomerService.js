const customerList = [{
    id: 1,
    idNumber: 2304,
    name: "Chánh",
    address: "Gia Lai",
    type: "VIP"
}, {
    id: 2,
    idNumber: 2305,
    name: "Thiện",
    address: "Đà Nẵng",
    type: "VIP"
}, {
    id: 3,
    idNumber: 2306,
    name: "Nam",
    address: "Nghệ An",
    type: "VIP"
}, {
    id: 4,
    idNumber: 2307,
    name: "Thái",
    address: "Gia Lai",
    type: "Gold"
}, {
    id: 5,
    idNumber: 2308,
    name: "Huy",
    address: "Đà Nẵng",
    type: "Normal"
}]

export function getAll(){
    return customerList;
}

export function deleteById(id){
    for (let i = 0; i < customerList.length; i++) {
        if (customerList[i].id==id){
            customerList.splice(i,1);
            break;
        }
    }
}