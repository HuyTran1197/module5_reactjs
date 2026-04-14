import {useEffect, useState} from "react";
import {publicMusic, searchMusic} from "../service/MusicService.jsx";
import {Link} from "react-router";
import {Field, Form, Formik} from "formik";
import {Button, Modal} from "react-bootstrap";
import {toast} from "react-toastify";

const List = () => {
    const [musicList,setMusicList] = useState([]);
    const [isShowModal,setIsShowModal] = useState(false);
    const [reload,setReload] = useState(false);
    const [musicPublic,setPublic] = useState({
        id:"",
        name:"",
        startTime:""
    });
    const [search,setSearch] = useState({
        name:"",
        singleMan:"",
        status:""
    })
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        const fetData = async ()=>{
            const {data,totalPage} = await searchMusic(
                search.name,
                search.singleMan,
                search.status,
                page);
            setMusicList(data);
            setTotal(()=>Math.ceil(totalPage/3));
        }
        fetData();
    }, [reload,page,search]);


    const handleSearch = async (value) => {
        setSearch(value);
        setPage(1);
    }

    const handleReset = async () => {
        setSearch({
            name:"",
            singleMan:"",
            status:""
        });
        setPage(1);
    }

    const handlePre = () => {
        if (page>1){
            setPage(pre=>pre-1);
        }
    }

    const handleNext = () => {
        if (page<total){
            setPage(pre=>pre+1);
        }
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
            <div className={'text-end m-3'}>
                <Link to={'/music/add'} className={'btn btn-sm btn-success'}>
                    + Đăng ký bài hát
                </Link>
            </div>
            <Formik initialValues={search} onSubmit={handleSearch}>
                <Form>
                    <Field name={'name'} placeholder={'Nhập bài hát'}/>
                    <Field name={'singleMan'} placeholder={'Nhập ca sĩ'}/>
                    <Field name={'status'} as={'select'}>
                        <option value={''}>---chọn---</option>
                        <option value={'Công khai'}>Công khai</option>
                        <option value={'Lưu trữ'}>Lưu trữ</option>
                    </Field>
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
                          <td>{(page-1)*3 + i + 1}</td>
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
                    {(musicList.length==0)?
                        <tr>
                            <td className={'text-danger'} colSpan={7}><b>Không có dữ liệu !!!</b></td>
                        </tr>
                        : ""
                    }
                </tbody>
            </table>
            <div className={'pagination'}>
                <button onClick={handlePre}> Trước </button>
                {[...new Array(total)].map((e,i)=>(
                    <button className={`page-item ${page === i+1? 'active':''}`}
                            onClick={()=>{setPage(i+1)}}
                            key={i}>
                        {i+1}
                    </button>
                ))}
                <button onClick={handleNext}>Sau</button>
            </div>
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