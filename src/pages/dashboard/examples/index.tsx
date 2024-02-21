import ButtonSection from "@/components/section/button-section"
import { tableColumns } from "@/components/section/data-table/column"
import TableSection, { tableData } from "@/components/section/data-table/table-section"
import DragAndDrop from "@/components/features/drag-n-drop/drag-and-drop"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function index() {
    return <article className="p-5">
        <Tabs defaultValue="Drag And Drop" className="">
            <TabsList>
                <TabsTrigger value="Table">Table</TabsTrigger>
                <TabsTrigger value="Drag And Drop">Drag And Drop</TabsTrigger>
                <TabsTrigger value="Buttons">Buttons</TabsTrigger>
            </TabsList>
            <TabsContent value="Buttons"><ButtonSection /></TabsContent>
            <TabsContent value="Drag And Drop"><DragAndDrop /></TabsContent>
            <TabsContent value="Table"><TableSection data={tableData} columns={tableColumns} /></TabsContent>
        </Tabs>
    </article>
}