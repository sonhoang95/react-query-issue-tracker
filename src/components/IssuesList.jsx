import { useQuery } from 'react-query'
import { fetchData } from '../helpers/fetchData'
import { IssueItem } from './IssueItem'

export default function IssuesList({ labels, status }) {
  const issuesQuery = useQuery(['issues', { labels, status }], () => {
    const statusString = status ? `&status=${status}` : ''
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&')

    return fetchData(`/api/issues?${labelsString}${statusString}`)
  })

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
