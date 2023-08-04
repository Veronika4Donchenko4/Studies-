const ModalPostInfo = ({title, body}) => {
    return (
        <div className="modal__content">
            <h3>{title}</h3>
            <p>{body}</p>
        </div>
    );
}
export default ModalPostInfo;