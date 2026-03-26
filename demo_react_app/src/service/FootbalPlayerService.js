
const footballPlayerList = [{
    id: 1,
    playerId: 2304,
    name: "Ronaldo",
    birthday: "5/2/1985",
    transfer: "1 billion euro",
    position: "Strike"
}, {
    id: 2,
    playerId: 2305,
    name: "Messi",
    birthday: "5/5/1987",
    transfer: "1,1 billion euro",
    position: "Attack Mid"
}, {
    id: 3,
    playerId: 2306,
    name: "Dinh Bac Nguyen",
    birthday: "19/8/2004",
    transfer: "500 thousands euro",
    position: "Left Strike"
}]

export function getList(){
    return footballPlayerList;
}

export function deleteById(id){
    for (let i = 0; i < footballPlayerList.length; i++) {
        if (footballPlayerList[i].id==id){
            footballPlayerList.splice(i,1);
            break;
        }
    }
}

export function addNew(player) {
    for (let i = 0; i < footballPlayerList.length; i++) {
        if (footballPlayerList[i].id==player.id){
            alert("id is already exists");
            return false;
        }
    }
    footballPlayerList.push(player);
    alert("Add new success");
}
