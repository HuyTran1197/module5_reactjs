import {Button, Modal} from "react-bootstrap";
import {deleteById} from "../service/CustomerService.js";

const Delete = ({isShowModal,deleteCustomer,closeModal,setIsLoading}) =>{

    const handleClose = () =>{
        closeModal(false);
    }

    const handleDelete = () => {
        deleteById(deleteCustomer.id);
        closeModal(false);
        setIsLoading(pre=>!pre);
    }

    return(
        <>
            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete customer: <b className={'text-danger'}>{deleteCustomer.name}</b> </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Delete ;