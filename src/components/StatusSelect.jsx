import { possibleStatus } from '../helpers/defaultData'

export function StatusSelect({ status, onChange }) {
  return (
    <select value={status} onChange={onChange} className="status-select">
      <option value="">Please select an option to filter</option>
      {possibleStatus.map((status) => (
        <option value={status.id} key={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  )
}
