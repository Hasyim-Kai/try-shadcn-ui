import ContentContainer from "@/components/global/layout/content-container";
import NewColumnProjectModal from "@/components/global/modal/new-column-project-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import storeHelper from "@/store/storeHelper";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StrictModeDroppable from "./Droppable";
import MemberCard from "./member-card";
import { IProjectStateType } from "@/utils/constant/project-type";

export default function DragAndDrop() {
    const mainBoardRef = useRef<HTMLDivElement>(null);
    const [isMemberSidebarOpen, setIsMemberSidebarOpen] = useState(true)
    const toggleMemberSidebar = () => setIsMemberSidebarOpen((prevState) => !prevState)
    const { toggleNewColProjectModal } = storeHelper();
    const [columns, setColumns] = useState<IProjectStateType>({
        projekKematian: {
            id: `projekKematian`,
            title: 'Projek Kematian',
            maxMember: 7,
            items: [],
        },
        members: {
            id: `members`,
            title: 'Members',
            items: [
                {
                    id: '1',
                    name: 'Dayat',
                    role: 'Software Engineer',
                },
                {
                    id: '2',
                    name: 'Joko',
                    role: 'Software Engineer',
                },
                {
                    id: '3',
                    name: 'Samsul',
                    role: 'Software Engineer',
                },
                {
                    id: '4',
                    name: 'Udin',
                    role: 'QA Engineer',
                },
                {
                    id: '5',
                    name: 'Mukidi',
                    role: 'Software Engineer',
                },
                {
                    id: '6',
                    name: 'Bambang',
                    role: 'QA Engineer',
                },
                {
                    id: '7',
                    name: 'Nasrul',
                    role: 'Software Engineer',
                },
                {
                    id: '8',
                    name: 'Lukito',
                    role: 'QA Engineer',
                },
            ],
        },
    });

    const onDragEnd = ({ source, destination }: any) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null

        // Make sure we're actually moving the item
        if (source.droppableId === destination.droppableId && destination.index === source.index) return null

        // Set start and end variables
        const startColumn = columns[source.droppableId]
        const endColumn = columns[destination.droppableId]

        // If start is the same as end, we're in the same column
        if (startColumn === endColumn) {
            const newList = startColumn.items.filter((_: any, idx: number) => idx !== source.index)
            // Then insert the item at the right location
            newList.splice(destination.index, 0, startColumn.items[source.index])

            // Then create a new copy of the column object
            const newCol = {
                ...startColumn,
                items: newList
            }
            setColumns((state: any) => ({ ...state, [newCol.id]: newCol }))
            return null
        } else {
            // Insert the item into the end list
            const newEndList = endColumn.items
            // this is dragged object
            const fieldToAdd = { ...startColumn.items[source.index] }
            const filteredSourceColumnItems = startColumn.items.filter((object: any) => object.id !== fieldToAdd.id)
            newEndList.splice(destination.index, 0, fieldToAdd)

            const newDestinationColumn = {
                ...endColumn,
                items: newEndList
            }
            const filteredSourceColumn = {
                ...startColumn,
                items: filteredSourceColumnItems
            }
            setColumns((state: any) => ({
                ...state,
                [filteredSourceColumn.id]: filteredSourceColumn,
                [newDestinationColumn.id]: newDestinationColumn
            }))
            return null
        }
    }


    const [mainBoardRefrHeight, setMainBoardRefrHeight] = useState(`100px`)
    useEffect(() => { setMainBoardRefrHeight((mainBoardRef.current?.clientHeight ? mainBoardRef.current?.clientHeight : 100) + `px`) }, [mainBoardRef])
    // STYLING
    const mainBoardWidth = `15rem`
    const mainBoardStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(0, ${mainBoardWidth}))`,
        gap: '0.75rem',
        width: `calc(${Object.keys(columns).length}*${mainBoardWidth} * 1.1)`,
        height: `98%`,
    }
    const projectCardStyle = {
        maxHeight: mainBoardRefrHeight,
    }

    return <div className="flex relative">
        <DragDropContext onDragEnd={onDragEnd}>
            <ContentContainer padding additonalClass={`overflow-x-auto ${isMemberSidebarOpen ? 'mr-64' : 'mr-16'} smooth`}>
                <main className={``} style={mainBoardStyle} ref={mainBoardRef}>
                    {Object.entries(columns).map(([columnId, column]) => column.id !== 'members' &&
                        <section style={projectCardStyle}
                            className={`border h-fit rounded-md pb-3 bg-white shadow-lg shadow-gray-200 overflow-y-auto overflow-x-hidden`}>
                            <div className='font-medium sticky top-0 z-40 bg-white px-3 pt-3 space-y-1.5'>
                                <h1 className="text-xl font-semibold line-clamp-2 pr-3">{column?.title}</h1>
                                <p className="text-xs px-2 py-1 rounded-3xl bg-white w-fit border border-gray-500">Due Date : 12/23/2024</p>
                                <p className="text-xs px-2 py-1 rounded-3xl bg-white w-fit border border-gray-500">Members : <span>{column?.items.length} / {column?.maxMember}</span></p>
                            </div>
                            {/* <div className="h-[full] w-full bg-sky-300">a <br />aa <br />aa <br />aa <br />aa <br />a</div> */}
                            <StrictModeDroppable droppableId={columnId} key={columnId} isDropDisabled={column?.items.length >= (column?.maxMember || 1)}>

                                {(provided: any) => <div ref={provided.innerRef} {...provided.droppableProps}
                                    className={`flex flex-col px-3 w-full min-h-10`}>
                                    {column?.items.map((item: any, index: number) =>
                                        <MemberCard additionalClass="mt-3" key={item.id} item={item} index={index} />)}
                                    {provided.placeholder}
                                </div>}

                            </StrictModeDroppable>
                        </section>)}

                    {/* ADD COLUMN */}
                    <Button variant="outline" className="gap-2" onClick={toggleNewColProjectModal}>
                        <Plus />Add New Column
                    </Button>
                </main>
            </ContentContainer>

            {/* MEMBER SIDEBAR */}
            <section className={`fixed bg-white p-3 border-l border-sky-400 h-full max-h-full w-64 ${isMemberSidebarOpen ? 'right-0' : '-right-48'} smooth`}>
                <div className="flex gap-4 items-center">
                    <Button size={"icon"} variant={"outline"} onClick={toggleMemberSidebar}>{isMemberSidebarOpen ? <><ChevronRight /> </> : <ChevronLeft />}</Button>
                    <h1 className="font-semibold text-2xl">Members</h1>
                </div>
                <Input className="my-3 w-11/12" type="search" placeholder="Search" />
                <StrictModeDroppable droppableId={columns.members.id} key={columns.members.id} isDropDisabled={false}>
                    {(provided: any) => <div ref={provided.innerRef} {...provided.droppableProps}
                        className='max-h-[calc(100%-11rem)] h-full flex flex-col overflow-y-auto mb-16'>
                        {/* <main className="flex flex-col"> */}
                        {columns.members?.items.map((item: any, index: number) =>
                            <MemberCard additionalClass="mt-3" key={item.id} item={item} index={index} />)}
                        {provided.placeholder}
                        {/* </main> */}
                    </div>}
                </StrictModeDroppable>
            </section>
        </DragDropContext>

        <NewColumnProjectModal addColFn={setColumns} />
    </div>
}