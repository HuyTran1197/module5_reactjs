import {Button, Modal} from "react-bootstrap";
import {deleteById} from "../service/FootbalPlayerService.js";
import {toast} from "react-toastify";

const DeletePlayer = ({isShowModal,deletePlayer,closeModal,setIsLoading}) =>{

    const handleClose = () =>{
        closeModal(false);
    }

    const handleDelete = async ()=>{
        const isSuccess = deleteById(deletePlayer.id);
        if (isSuccess){
            closeModal(false);
            setIsLoading(pre=>!pre);
            toast.success("Delete success");
        }else {
            toast.error("Delete fails");
        }

    }

    return(
        <>
            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete player: <b className={'text-danger'}>{deletePlayer.name}</b> ?</p>
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
export default DeletePlayer ;