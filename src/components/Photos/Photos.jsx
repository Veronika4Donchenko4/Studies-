import PhotosCard from "./PhotosCard/PhotosCard";
import "../../general/styles/mainContent.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPhotos, showStartPhotos, showNextPhotos, openModalPhotoAdd } from "../../redux/slices/photosSlice";
import ContentPreloader from "../../general/ContentPreloader/ContentPreloader";
import ModalPhotoInfo from "./PhotosModals/ModalPhotoInfo";
import Modal from "../../general/Modal/Modal";
import ModalPhotoAdd from "./PhotosModals/ModalPhotoAdd";
import ModalPhotoEdit from "./PhotosModals/ModalPhotoEdit";
import ModalPhotoDelete from "./PhotosModals/ModalPhotoDelete";

const Photos = () => {
    const { items, showItems, statusApi, startPhotosCount, 
            currentPhoto, isShowPhotoInfo, isShowPhotoAdd, 
            isShowPhotoEdit, modalTitle, isShowPhotoDelete } = useSelector(state => state.photosSlice);
    const dispatch = useDispatch();
   
    useEffect(() => {
        const getPhotos = async () => {
            try {
                await dispatch(fetchPhotos());
                await dispatch(showStartPhotos());
            } catch (error) {
                console.error(error);
            }
        }
        getPhotos();
    }, []);
    
    const showPhotos = showItems.map(photo => <PhotosCard id={photo.id} key={photo.id} title={photo.title} url={photo.url} />);

    const photoModalInfo = <ModalPhotoInfo title={currentPhoto.title} url={currentPhoto.url} />
    const photoModalAdd = <ModalPhotoAdd countPhotos={items.length + showItems.length} />;
    const photoModalEdit = <ModalPhotoEdit id={currentPhoto.id} title={currentPhoto.title} url={currentPhoto.url} />;
    const photoModalDelete = <ModalPhotoDelete id={currentPhoto.id} />;

    const makeSizeCards = () => {
        const cards = document.getElementById("cards");
        const btn = document.getElementById("cardsSizeBtn");

        if (cards.classList.contains("cards--small")) {
            cards.classList.remove("cards--small");
            cards.classList.add("cards--big");
            btn.innerText = "Make small cards";
            return cards;
        } else {
            cards.classList.remove("cards--big");
            cards.classList.add("cards--small");
            btn.innerText = "Make big cards";
            return cards;
        }
    }
    
    return (
        <div>
            { isShowPhotoInfo && <Modal title={modalTitle} modalContent={photoModalInfo} dataType="photos" />}
            { isShowPhotoAdd && <Modal title={modalTitle} modalContent={photoModalAdd} dataType="photos" />}
            { isShowPhotoEdit && <Modal title={modalTitle} modalContent={photoModalEdit} dataType="photos" />}
            { isShowPhotoDelete && <Modal title={modalTitle} modalContent={photoModalDelete} dataType="photos" />}
            <div className="header__content">
                <h1>Photo List</h1>
                <div>
                    <button id="cardsSizeBtn" onClick={makeSizeCards}>Make big cards</button>
                    <button onClick={() => dispatch(openModalPhotoAdd())}>Add photo</button>
                </div>
            </div>
            { showPhotos.length < 1 && statusApi === "loading"
            ? <ContentPreloader />
            : <div>
                {statusApi === "error" && <div className="error-info">Response has been rejected</div>}
                <div id="cards" className="cards--small">
                    {showPhotos}
                </div>
                <div className="showMore">
                    { startPhotosCount === 0
                    ? <button onClick={() => dispatch(showNextPhotos())}>Show more</button>
                    : ""
                    }
                </div>
            </div>
            }
        </div>
    );
}
export default Photos;