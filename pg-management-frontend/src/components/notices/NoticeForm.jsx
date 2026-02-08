import { useState } from "react";
import "./NoticeForm.css";

function NoticeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !message.trim()) return;

    onAdd({
      title,
      message,
      date: new Date().toLocaleDateString(),
    });

    // reset form
    setTitle("");
    setMessage("");
  };

  return (
    <div className="notice-form">
      <h4>Add New Notice</h4>

      <input
        className="notice-input"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="notice-textarea"
        placeholder="Notice Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="notice-btn" onClick={handleSubmit}>
        Post Notice
      </button>
    </div>
  );
}

export default NoticeForm;
