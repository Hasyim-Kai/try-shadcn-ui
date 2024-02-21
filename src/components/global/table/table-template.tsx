import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IToast } from "@/utils/helper/toast"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus } from "lucide-react"

type Props = {}

export default function TableTemplate({ }: Props) {
    const cols = [
        // { type: 'checkbox', title: 'select',name: 'select' },
        { type: 'text', title: 'Status', name: 'status' },
        { type: 'text', title: 'Name', name: 'name' },
        { type: 'text', title: 'Email', name: 'email' },
    ]
    const tableData = [
        { id: 1, type: 'text', status: 'Unactive', name: 'Sugiono', email: 'sugiono@gmail.com' },
        { id: 2, type: 'text', status: 'Active', name: 'Dayat', email: 'dayat@gmail.com' },
    ]

    return <div className="flex flex-col">

        <section className="flex justify-between items-center mb-5">
            <Input className="w-72" type="search" placeholder="Search" />
            <Button className="gap-3 bg-sky-400" type="button" variant={"ghost"}
                // <Button className="gap-3" type="submit" variant="default"
                onClick={() => IToast(`Column Has Created`, `Now you can add some task to new column`)}>
                <Plus size={16} /> Create
            </Button>
        </section>

        {/* TABLE */}
        <div className="border rounded-lg overflow-hidden divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                {/* TABLE HEADER */}
                <thead className="dark:bg-gray-700">
                    <tr className="">
                        {cols.map((col, index) => {
                            if (col.type === `checkbox`) {
                                return <th scope="col" className="py-3 px-4 pe-0" key={index}>
                                    <div className="flex items-center h-5">
                                        <input id="hs-table-pagination-checkbox-all" type="checkbox" className="border-gray-200 rounded accent-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                        <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                                    </div>
                                </th>
                            } else {
                                return <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 font-bold uppercase" key={index}>{col.title}</th>
                            }
                        })}
                        <th scope="col" className="px-6 py-3 text-start text-xs text-gray-500 font-bold uppercase">Actions</th>
                    </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tableData.map((tableRow) => <tr className="py-3 ps-4" key={tableRow.id}>
                        {cols.map((colItem) => <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{tableRow[colItem.name]}</td>)}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Actions</td>
                    </tr>)}
                </tbody>
            </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center space-x-6 lg:space-x-8 py-3 px-4">
            <div className="ml-auto flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                    value={`10`}
                // onValueChange={(value: string) => {
                //     table.setPageSize(Number(value))
                // }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={`10`} />
                    </SelectTrigger>
                    <SelectContent side="left">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page 1 of 2
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                // onClick={() => table.setPageIndex(0)}
                // disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                // onClick={() => table.previousPage()}
                // disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                // onClick={() => table.nextPage()}
                // disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                // disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
}