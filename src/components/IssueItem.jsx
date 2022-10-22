import { Link } from 'react-router-dom'
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go'
import { relativeDate } from '../helpers/relativeDate'

export function IssueItem({
  key,
  title,
  number,
  assignee,
  commentCount,
  labels,
  createdBy,
  createdDate,
  status,
}) {
  return (
    <li>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issues/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span className="label red" key={label}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee ? <div>{assignee}</div> : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment /> {commentCount}
          </>
        ) : null}
      </span>
    </li>
  )
}
