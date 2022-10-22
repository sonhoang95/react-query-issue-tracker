import { useQuery } from 'react-query'
import { fetchData } from '../helpers/fetchData'
import { IssueItem } from './IssueItem'

export default function IssuesList() {
  const issuesQuery = useQuery(['issues'], () => fetchData('/api/issues'))

  const { data, isLoading } = issuesQuery

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {data.map((issue) => {
            const {
              id,
              title,
              number,
              assignee,
              comments,
              labels,
              createdBy,
              createdDate,
              status,
            } = issue
            return (
              <IssueItem
                key={id}
                title={title}
                number={number}
                assignee={assignee}
                commentCount={comments.length}
                labels={labels}
                createdBy={createdBy}
                createdDate={createdDate}
                status={status}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
