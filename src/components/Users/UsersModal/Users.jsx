import UsersCard from "./UsersCard/UsersCard";
import "../../general/styles/mainContent.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, showStartUsers, showNextUsers, openModalUserAdd } from "../../redux/slices/usersSlice";
import ContentPreloader from "../../common/ContentPreloader/ContentPreloader";
import ModalUserInfo from "./UsersModals/ModalUserInfo";
import Modal from "../../general/Modal/Modal";
import ModalUserAdd from "./UsersModals/ModalUserAdd";
import ModalUserEdit from "./UsersModals/ModalUserEdit";
import ModalUserDelete from "./UsersModals/ModalUserDelete";

const Users = () => {
    const { items, showItems, statusApi, startUsersCount, 
        currentUser, isShowUserInfo, isShowUserAdd, 
        isShowUserEdit, modalTitle, isShowUserDelete } = useSelector(state => state.usersSlice);
const dispatch = useDispatch();

useEffect(() => {
    const getUsers = async () => {
        try {
            await dispatch(fetchUsers());
            await dispatch(showStartUsers());
        } catch (error) {
            console.error(error);
        }
    }
    getUsers();
}, []);

const showUsers = showItems.map(user => <UsersCard id={user.id} key={user.id} name={user.name} email={user.email} phone={user.phone} />);

const userModalInfo = <ModalUserInfo name={currentUser.name} username={currentUser.username} email={currentUser.email} phone={currentUser.phone} website={currentUser.website} />
const userModalAdd = <ModalUserAdd countUsers={items.length + showItems.length} />;
const userModalEdit = <ModalUserEdit id={currentUser.id} name={currentUser.name} username={currentUser.username} email={currentUser.email} phone={currentUser.phone} website={currentUser.website} />;
const userModalDelete = <ModalUserDelete id={currentUser.id} />;

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
        { isShowUserInfo && <Modal title={modalTitle} modalContent={userModalInfo} dataType="users" />}
        { isShowUserAdd && <Modal title={modalTitle} modalContent={userModalAdd} dataType="users" />}
        { isShowUserEdit && <Modal title={modalTitle} modalContent={userModalEdit} dataType="users" />}
        { isShowUserDelete && <Modal title={modalTitle} modalContent={userModalDelete} dataType="users" />}
        <div className="header__content">
            <h1>User List</h1>
            <div>
                <button id="cardsSizeBtn" onClick={makeSizeCards}>Make big cards</button>
                <button onClick={() => dispatch(openModalUserAdd())}>Add user</button>
            </div>
        </div>
        { showUsers.length < 1 && statusApi === "loading"
        ? <ContentPreloader />
        : <div>
            {statusApi === "error" && <div className="error-info">Response has been rejected</div>}
            <div id="cards" className="cards--small">
                {showUsers}
            </div>
            <div className="showMore">
                { startUsersCount === 0
                ? <button onClick={() => dispatch(showNextUsers())}>Show more</button>
                : ""
                }
            </div>
        </div>
        }
    </div>
);
}
export default Users;