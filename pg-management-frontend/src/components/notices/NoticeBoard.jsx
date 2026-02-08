import "./NoticeBoard.css";

function NoticeBoard({ notices }) {
  const sortedNotices = [...notices].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="notice-board">
      <h3>Notice Board</h3>

      {sortedNotices.length === 0 ? (
        <p className="no-notice">No notices available</p>
      ) : (
        <div className="notice-list">
          {sortedNotices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <h4>{notice.title}</h4>
              <p>{notice.content}</p>

              {notice.createdAt && (
                <span className="notice-date">
                  {new Date(notice.createdAt).toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
