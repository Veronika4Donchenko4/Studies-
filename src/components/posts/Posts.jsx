import PostsCard from "./PostsCard/PostsCard";
import "../../common/styles/mainContent.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, showStartPosts, showNextPosts, openModalPostAdd } from "../../redux/slices/postsSlice";
import ContentPreloader from "../../general/ContentPreloader/ContentPreloader";
import ModalPostInfo from "./PostsModals/ModalPostInfo";
import Modal from "../../common/Modal/Modal";
import ModalPostAdd from "./PostsModals/ModalPostAdd";
import ModalPostEdit from "./PostsModals/ModalPostEdit";
import ModalPostDelete from "./PostsModals/ModalPostDelete";

const Posts = () => {
    const { items, showItems, statusApi, startPostsCount, 
            currentPost, isShowPostInfo, isShowPostAdd, 
            isShowPostEdit, modalTitle, isShowPostDelete } = useSelector(state => state.postsSlice);
    const dispatch = useDispatch();
   
    useEffect(() => {
        const getPosts = async () => {
            try {
                await dispatch(fetchPosts());
                await dispatch(showStartPosts());
            } catch (error) {
                console.error(error);
            }
        }
        getPosts();
    }, []);
    
    const showPosts = showItems.map(post => <PostsCard id={post.id} key={post.id} title={post.title} body={post.body} />);

    const postModalInfo = <ModalPostInfo title={currentPost.title} body={currentPost.body} />
    const postModalAdd = <ModalPostAdd countPosts={items.length + showItems.length} />;
    const postModalEdit = <ModalPostEdit id={currentPost.id} title={currentPost.title} body={currentPost.body} />;
    const postModalDelete = <ModalPostDelete id={currentPost.id} />;

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
            { isShowPostInfo && <Modal title={modalTitle} modalContent={postModalInfo} dataType="posts" />}
            { isShowPostAdd && <Modal title={modalTitle} modalContent={postModalAdd} dataType="posts" />}
            { isShowPostEdit && <Modal title={modalTitle} modalContent={postModalEdit} dataType="posts" />}
            { isShowPostDelete && <Modal title={modalTitle} modalContent={postModalDelete} dataType="posts" />}
            <div className="header__content">
                <h1>Article List</h1>
                <div>
                    <button id="cardsSizeBtn" onClick={makeSizeCards}>Make big cards</button>
                    <button onClick={() => dispatch(openModalPostAdd())}>Add article</button>
                </div>
            </div>
            { showPosts.length < 1 && statusApi === "loading"
            ? <ContentPreloader />
            : <div>
                {statusApi === "error" && <div className="error-info">Response has been rejected</div>}
                <div id="cards" className="cards--small">
                    {showPosts}
                </div>
                <div className="showMore">
                    { startPostsCount === 0
                    ? <button onClick={() => dispatch(showNextPosts())}>Show more</button>
                    : ""
                    }
                </div>
            </div>
            }
        </div>
    );
}
export default Posts;