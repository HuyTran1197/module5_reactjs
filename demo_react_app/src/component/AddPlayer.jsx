import {useRef} from "react";
import {addNew} from "../service/FootbalPlayerService.js";

const AddPlayer = ({setIsLoading}) => {
    const idRef = useRef("");
    const playerIdRef = useRef("");
    const nameRef = useRef("");
    const birthdayRef = useRef("");
    const transferRef = useRef("");
    const positionRef = useRef("");

    const handleAdd = () => {
        let player = {
            id : idRef.current.value,
            playerId : playerIdRef.current.value,
            name : nameRef.current.value,
            birthday : birthdayRef.current.value,
            transfer : transferRef.current.value,
            position : positionRef.current.value,
        }
        addNew(player);
        setIsLoading(pre=>!pre);
    }
    return(
        <>
            <form>
                <input ref={idRef} placeholder={'Enter id'}/>
                <input ref={playerIdRef} placeholder={'Enter player id'}/>
                <input ref={nameRef} placeholder={'Enter name'}/>
                <input ref={birthdayRef} placeholder={'Enter birthday'}/>
                <input ref={transferRef} placeholder={'Enter transfer value'}/>
                <input ref={positionRef} placeholder={'Enter position'}/>
                <button onClick={handleAdd}  type={'button'}>Save</button>
            </form>
        </>
    )
}
export default AddPlayer ;