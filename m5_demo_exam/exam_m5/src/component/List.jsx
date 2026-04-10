import {useEffect, useState} from "react";
import {findAll, publicMusic, searchName} from "../service/MusicService.jsx";
import {Link} from "react-router";
import {Field, Form, Formik} from "formik";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

const List = () => {
    const [musicList,setMusicList] = useState([]);
    const [musicPublic,setPublic] = useState({
        id:"",
        name:""
    });
    const [isShowModal,setIsShowModal] = useState(false);
    const [reload,setReload] = useState(false);


    useEffect(() => {
        const fetData = async ()=>{
            setMusicList(await findAll());
        }
        fetData();
    }, [reload]);

    const [search] = useState({
        name:""
    })

    const handleSearch = async (value) => {
        const name = value.name;
        setMusicList(await searchName(name));
    }

    const handleReset = async () => {
        setMusicList(await findAll());
    }

    const handleOpenModal = (music) => {
        setPublic(music);
        setIsShowModal(true);
    }

    const handleClose = () => {
        setIsShowModal(false);
    }

    const handlePublic = async () => {
        const updateMusic = {
            ...musicPublic,
            status: "Công khai"
        }
        await publicMusic(updateMusic);
        handleClose();
        setReload(pre=>!pre);
        toast.success('Công khai thành công');
    }

    const [music,setMusic] = useState({
        name:"",
        singleMan:"",
        startTime:""
    });

    const handleShow = (ms) => {
        setMusic({...ms});

    }

    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    {music ? (
                        <>
                            <div className="col-3">
                                <div className="border p-3 bg-white shadow">
                                    <h4>{music.name}</h4>
                                    <p>{music.singleMan}</p>
                                    <p>{music.startTime}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-muted">Chưa chọn bài hát</p>
                        </>
                    )}

                </div>
            </div>
            <div>
                <Link to={'/music/add'} className={'btn btn-sm btn-success'}>
                    Đăng ký bài hát
                </Link>
            </div>
            <Formik initialValues={search} onSubmit={handleSearch}>
                <Form>
                    <Field name={'name'} placeholder={'Nhập bài hát'}/>
                    <Button className={'btn btn-sm'} type={'submit'}>Tìm kiếm</Button>
                    <Button className={'btn btn-sm btn-dark'} onClick={handleReset} type={'reset'}>Quay lại</Button>
                </Form>
            </Formik>
            <table>
                <thead>
                  <tr>
                      <th>STT</th>
                      <th>Tên bài hát</th>
                      <th>Ca sĩ</th>
                      <th>Thời gian phát</th>
                      <th>Lượt yêu thích</th>
                      <th>Trạng thái</th>
                      <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {musicList.map((ms,i)=>(
                      <tr key={ms.id} onClick={()=>handleShow(ms)}>
                          <td>{i+1}</td>
                          <td>{ms.name}</td>
                          <td>{ms.singleMan}</td>
                          <td>{ms.startTime}</td>
                          <td>{ms.likeCount}</td>
                          <td>{ms.status}</td>
                          <td>
                              <Button className={'btn btn-sm'} onClick={(e)=>{
                                  e.stopPropagation();
                                  handleOpenModal(ms)
                              }}>
                                  Công khai
                              </Button>
                          </td>
                      </tr>
                  ))}
                </tbody>
            </table>

            <Modal show={isShowModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Xác nhận để công khai bài hát: <b className={'text-danger'}>{musicPublic.name}</b> ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handlePublic}>
                        Công khai
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default List;