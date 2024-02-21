type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}