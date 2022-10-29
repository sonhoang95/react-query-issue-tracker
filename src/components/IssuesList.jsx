import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchData } from '../helpers/fetchData'
import { IssueItem } from './IssueItem'

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState(null)

  const issuesQuery = useQuery(['issues', { labels, status }], () => {
    const statusString = status ? `&status=${status}` : ''
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&')

    return fetchData(`/api/issues?${labelsString}${statusString}`)
  })

  const searchQuery = useQuery(
    ['issues', 'search', searchValue],
    () =>
      fetch(`/api/search/issues?q=${searchValue}`).then((res) => res.json()),
    { enabled: !!searchValue }
  )

  const { data, isLoading } = issuesQuery

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSearchValue(e.target.elements.search.value)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">Search Issues</label>
        {/* having an onChange to handle when we clear search value */}
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          onChange={(event) => {
            if (!event.target.value) {
              setSearchValue('')
            }
          }}
        />
      </form>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? (
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
      ) : (
        <>
          {searchQuery.isLoading ? (
            <p>Loading....</p>
          ) : (
            <>
              <p>{searchQuery.data.count} results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => {
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
            </>
          )}
        </>
      )}
    </div>
  )
}
