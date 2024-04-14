export type ITableCellType = 'TEXT' | 'STATUS' | 'IMG' | 'ACTIONS' | 'CHECKBOX'
export type ITableColumnType = {
    type: ITableCellType
    title: string
    name: string
}
export type ITableDataType = {
    id: number
    type: string
    status: string
    name: string
    email: string
}