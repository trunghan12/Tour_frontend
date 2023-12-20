import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./listComment.css";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListComment() {
  const [showModal, setShowModal] = useState(false);
  const [listComment, setListComment] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [commentId, setCommentId] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getAllComment();
  }, [page]);

  async function getAllComment() {
    try {
      const res = await axios.get(`${BASE_URL}/review/getAll?page=` + page);
      setListComment(res.data.data);

      const resAllComment = await axios.get(`${BASE_URL}/review`);
      if (resAllComment.status == 200) {
        const commentCount = resAllComment.data.count;
        const pages = Math.ceil(commentCount / 8); // later we will use backend data count
        setPageCount(pages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleHideComment(comment_id) {
    // tìm kiếm commnent đi gán isHide = true

    //call API hide, check comment
    const reviewUpdate = {
      isHide: true,
      isCheck: true,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/review/adminReply/` + comment_id,
        reviewUpdate,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.status == 200) {
        const newListComment = listComment.map((comment) =>
          comment._id === comment_id
            ? { ...comment, isHide: true, isCheck: true }
            : comment
        );
        setListComment(newListComment);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDisplayComment(comment_id) {
    // tìm kiếm commnent đi gán isHide = true

    //call API hide, check comment
    const reviewUpdate = {
      isHide: false,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/review/adminReply/` + comment_id,
        reviewUpdate,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.status == 200) {
        const newListComment = listComment.map((comment) =>
          comment._id === comment_id ? { ...comment, isHide: false } : comment
        );
        setListComment(newListComment);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReplyComment() {
    //call API hide, check comment
    const reviewUpdate = {
      replyText: replyText,
    };
    try {
      const res = await axios.put(
        `${BASE_URL}/review/adminReply/` + commentId,
        reviewUpdate,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (res.status == 200) {
        const newListComment = listComment.map((comment) =>
          comment._id === commentId
            ? { ...comment, replyText: replyText }
            : comment
        );
        setListComment(newListComment);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  let i = 0;

  function close() {
    setShowModal(false);
  }

  function handleShowModal(comment_id) {
    setCommentId(comment_id);
    setShowModal(true);
  }

  return (
    <>
      <div className="container mb-5">
        <h1 className="mb-5">Danh sách bình luận Tour</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên người dùng</th>
              <th width="200" scope="col">
                Tour
              </th>
              <th scope="col">Số sao</th>
              <th width="300" scope="col">
                Nội dung
              </th>
              <th scope="col">Trả lời bình luận</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {listComment &&
              listComment.map((comment) => {
                i++;
                return (
                  <tr
                    id={comment._id}
                    key={comment._id}
                    style={{
                      background: comment.isCheck ? "#fff" : "#F9F4EC",
                    }}
                  >
                    <th scope="row">{i}</th>
                    <td>{comment.username}</td>
                    <td>{comment.tourName}</td>
                    <td>{comment.rating} sao</td>
                    <td>{comment.reviewText}</td>
                    <td>{comment.replyText}</td>
                    <td>
                      <button
                        onClick={() => handleShowModal(comment._id)}
                        className="btn btn-sm btn__success  mr-3"
                      >
                        Duyệt
                      </button>
                      {comment.isHide ? (
                        <button
                          onClick={() => handleDisplayComment(comment._id)}
                          className="btn btn-sm btn-warning"
                        >
                          Hiển thị
                        </button>
                      ) : (
                        <button
                          onClick={() => handleHideComment(comment._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Ẩn
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        className="pagination d-flex align-items-center 
          justify-content-center mt-4 gap-3"
      >
        {[...Array(pageCount).keys()].map((number) => (
          <span
            key={number}
            onClick={() => setPage(number)}
            className={page === number ? "active__page" : ""}
          >
            {number + 1}
          </span>
        ))}
      </div>
      <Modal show={showModal} onHide={close}>
        <Modal.Header closeButton>
          <label className="font-weight-bold">Bình luận</label>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control my-3"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="d-flex justify-content-end">
            <button onClick={close} className="btn btn-primary">
              Không
            </button>
            <button
              onClick={handleReplyComment}
              className="btn btn__success  ml-3"
            >
              Bình luận
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
