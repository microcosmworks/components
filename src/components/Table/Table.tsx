import React from 'react'
import { ButtonVariant } from 'src/helpers/interfaces'

import { Button } from '../Button'

interface Props<T> {
  tableClassName: string
  headerClassName: string
  columns: { key: string; label: string; formatter?: (row: T) => React.ReactNode }[]
  data: T[]
  actionsHeaderText: string
  actions?: { label: string; action: (row: T) => void; buttonColor?: ButtonVariant }[]
  getID: (row: T) => string
  onRowClick?: (row: T) => void
}

function Table<T>(props: Props<T>) {
  const {
    tableClassName,
    headerClassName,
    columns,
    data,
    actionsHeaderText,
    actions,
    getID,
    onRowClick,
  } = props

  const table = (
    <table className={tableClassName}>
      <thead className={headerClassName}>
        <tr>
          {columns.map((column) => (
            <th key={column.key as string}>{column.label}</th>
          ))}
          {actions ? <th>{actionsHeaderText}</th> : null}
        </tr>
      </thead>

      <tbody>
        {data.map((row: T) => (
          <tr
            key={getID(row)}
            onClick={() => {
              if (onRowClick) {
                onRowClick(row)
              }
            }}
          >
            {columns.map((column) => {
              const content = !column.formatter ? row[column.key as keyof T] : column.formatter(row)
              return <td key={`${column.key}-${getID(row)}`}>{content}</td>
            })}

            {actions ? (
              <td>
                {actions.map(({ label, action, buttonColor }, i) => (
                  <Button
                    key={label}
                    color={buttonColor || 'primary'}
                    onClick={(e) => {
                      e.stopPropagation()
                      action(row)
                    }}
                    className={i > 0 ? 'ml-1' : ''}
                  >
                    {label}
                  </Button>
                ))}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return table
}

Table.defaultProps = {
  tableClassName: 'table table-hover',
  headerClassName: 'thead-light',
  actionsHeaderText: 'Actions',
}

export { Table }
