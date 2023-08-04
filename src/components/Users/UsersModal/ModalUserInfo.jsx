const ModalUserInfo = ({ name, username, email,  phone, website}) => {
    return (
        <div className="modal__content">
            <h3>{name}</h3>
            <p>{username}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{website}</p>
        </div>
    );
}
export default ModalUserInfo;