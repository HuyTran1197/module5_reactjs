import {Component} from "react";
import {getAll} from "../service/CustomerService.js";
import DeleteClassComponent from "./DeleteClassComponent.jsx";

class CustomerListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            isShowModal: false,
            deleteCustomer: {
                // id: "",
                name: ""
            }
        }
    }
    componentDidMount() {
        console.log("----did mount---")
        this.setState(pre=>({
            ...pre,
            customerList: [...getAll()]
        }))
    }

    handleOpenModal = (customer) =>{
        this.setState(pre=>({
            ...pre,
            isShowModal: true,
            deleteCustomer: customer
        }))
    }
    closeModal = ()=>{
        this.setState(pre=>({
            ...pre,
            isShowModal: false,
        }))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.isShowModal!=prevState.isShowModal){
            this.setState(pre=>({
                ...pre,
                customerList: [...getAll()]
            }))
        }
        console.log("----did update----")
    }

    render() {
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
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.customerList&&this.state.customerList.map((e,i)=>(
                        <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.idNumber}</td>
                            <td>{e.name}</td>
                            <td>{e.address}</td>
                            <td>{e.type}</td>
                            <td>
                                <button onClick={()=>{
                                    this.handleOpenModal(e)
                                }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <DeleteClassComponent isShowModal={this.state.isShowModal}
                                      deleteCustomer={this.state.deleteCustomer}
                                      closeModal={this.closeModal}
                />
            </>
        )
    }

}
export default CustomerListComponent;