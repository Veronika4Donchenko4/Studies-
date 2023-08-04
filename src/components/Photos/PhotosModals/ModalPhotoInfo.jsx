const ModalPhotoInfo = ({title, url}) => {
    return (
        <div className="modal__content">
            <h3 className="photo__title">{title}</h3>
            <img src={url} alt={url} />
        </div>
    );
}
export default ModalPhotoInfo;