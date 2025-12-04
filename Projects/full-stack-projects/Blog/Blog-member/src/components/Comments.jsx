import { useState } from "react";
import MdiDelete from "../assets/MdiDelete";

const Comments = ({post, postId, token})  => {
    const [comments, setComments] = useState(post.comments.toReversed());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        text: "",
    });
    const [error, setError] = useState(null);

    const addComment = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch (
                `https://blog-api-tjau.onrender.com/posts/${postId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newComment),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }

            const data = await response.json();
            setComments((prev) => [data, ...prev]);
            setNewComment({name: "", email: "", text: ""});
        } catch (err) {
            console.error("Error fetching data: ", err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteComment = async (commentId) => {
        setIsSubmitting(true);
        const TOKEN = localStorage.getItem("token");
        try {
            const response = await fetch (
                `https://blog-api-tjau.onrender.com/posts/comments/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            const data = await response.json();
            setComments((prev) => prev.filter((comment) => comment.id != data.id));
            setNewComment({name: "", email: "", text: ""});
        } catch (err) {
            console.error("Error deleting comment: ", err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) return <div>{error}</div>

    return (
        <>
            <h3>Comments</h3>
            <div className="commentsMeta">{comments.length}</div>
            <hr />
            <details>
                <summary role="button" className="secondary outline">
                    Add Comment
                </summary>
                <form onSubmit={addComment}>
                    <input 
                        type="text"
                        className="fullname"
                        id="fullname"
                        name="fullname"
                        placeholder="Name"
                        value={newComment.name}
                        onChange={(e) => 
                            setNewComment((prev) => ({...prev, name: e.target.value}))
                        }
                        required
                    />
                    <input
                       type="email"
                       className="email"
                       id="email"
                       name="email"
                       placeholder="Email"
                       value={newComment.email}
                       onChange={(e) => 
                        setNewComment((prev) => ({...prev, email: e.target.value}))
                       }
                       required 
                    />
                    <textarea
                        name="commentText"
                        id="commentText"
                        placeholder="Write you comment"
                        onChange={(e) => 
                            setNewComment((prev) => ({...prev, text: e.target.value}))
                        }
                        value={newComment.text}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </form>
            </details>
            
            <div className="comments">
                {comments.length > 0 && 
                    comments.map((comment) => (
                        <section key={comment.id}>
                            <div className="commentMeta">
                                <span className="authorName">
                                    <b>{comment.author_name}</b>
                                </span>
                                &#10072;
                                <span className="authorEmail">{comment.author_email}</span>
                                <button
                                    onClick={() => deleteComment(comment.id)}
                                    className="deleteBtn outline"
                                    aria-busy={isSubmitting}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting || <MdiDelete />}
                                </button>
                            </div>
                            <p className="commentText">{comment.text}</p>
                            <hr />
                        </section>
                    ))
                }
            </div>
        </>
    );
};

export default Comments;