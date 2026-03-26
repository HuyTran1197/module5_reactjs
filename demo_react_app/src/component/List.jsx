import {useEffect, useState} from "react";
import {getAll} from "../service/CustomerService.js";
import Delete from "./Delete.jsx";

const List = ()=>{
    const [customerList,setCustomerList] = useState([]);
    const [deleteCustomer,setDeleteCustomer] = useState({
        id: "",
        name: ""
    });
    const [isShowModal,setIsShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        setCustomerList([
            ...getAll()
        ])
    }, [isLoading]);

    const handleOpenModal = (customer)=>{
        setDeleteCustomer(customer);
        setIsShowModal(true);
    }

    return(
        <>
            {console.log("-----render----")}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Number</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {customerList.map((e,i)=>(
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.idNumber}</td>
                        <td>{e.name}</td>
                        <td>{e.address}</td>
                        <td>{e.type}</td>
                        <td>
                            <button onClick={()=>{
                                handleOpenModal(e)
                            }}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Delete isShowModal={isShowModal}
                    deleteCustomer={deleteCustomer}
                    closeModal={setIsShowModal}
                    setIsLoading={setIsLoading}
            />
        </>
    )
}

export default List ;