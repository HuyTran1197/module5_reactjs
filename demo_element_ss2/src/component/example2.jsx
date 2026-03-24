import React from "react";

const CUSTOMER=() =>{

    const info = [{
        id:1,
        idNumber: 2304,
        name: "Chánh",
        address: "Gia Lai",
        type: "VIP"
    },{
            id:2,
            idNumber: 2305,
            name: "Thiện",
            address: "Đà Nẵng",
            type: "VIP"
        },
            {
                id:3,
                idNumber: 2306,
                name: "Nam",
                address: "Nghệ An",
                type: "VIP"
            },
            {
                id:4,
                idNumber: 2307,
                name: "Thái",
                address: "Gia Lai",
                type: "Gold"
            },
            {
                id:5,
                idNumber: 2308,
                name: "Huy",
                address: "Đà Nẵng",
                type: "Normal"
            }
        ]

    return(
        <>
            <table>
                <thead>
                 <tr>
                     <th>ID</th>
                     <th>ID Number</th>
                     <th>Name</th>
                     <th>Address</th>
                     <th>Type</th>
                 </tr>
                </thead>
                <tbody>
                {info.map((e,i)=>(
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.idNumber}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default CUSTOMER;