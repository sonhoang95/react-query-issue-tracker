import { Link } from 'react-router-dom'
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go'
import { relativeDate } from '../helpers/relativeDate'
import { useUserData } from '../helpers/useUserData'

export function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  labels,
  createdBy,
  createdDate,
  status,
}) {
  const assigneeUser = useUserData(assignee)
  const createdByUser = useUserData(createdBy)

  console.log(assigneeUser.data)

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
          #{number} opened {relativeDate(createdDate)} by{' '}
          {createdByUser.isSuccess ? createdByUser.data.name : ''}
        </small>
      </div>
      {assigneeUser.isSuccess ? (
        <div>
          <img
            className="assigned-to"
            src={assigneeUser.data.profilePictureUrl}
            alt={assigneeUser.data.name}
          />
        </div>
      ) : null}
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
