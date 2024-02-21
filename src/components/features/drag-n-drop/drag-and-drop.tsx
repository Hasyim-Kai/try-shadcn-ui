import ContentContainer from "@/components/global/layout/content-container";
import NewColumnProjectModal from "@/components/global/modal/new-column-project-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import storeHelper from "@/store/storeHelper";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import StrictModeDroppable from "./Droppable";
import MemberCard from "./member-card";

export default function DragAndDrop() {
    const { toggleNewColProjectModal } = storeHelper();
    const [columns, setColumns] = useState<any>({
        cariPacar: {
            id: `cariPacar`,
            title: 'Cari Pacar',
            maxMember: 3,
            items: [],
        },
        deadProject: {
            id: `deadProject`,
            title: 'Dead Project',
            maxMember: 5,
            items: [],
        },
        members: {
            id: `members`,
            title: 'Members',
            maxMember: 3,
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

    return <div className="flex relative">
        <DragDropContext onDragEnd={onDragEnd}>
            <ContentContainer padding additonalClass="h-[calc(100vh-4.1rem)]">
                <main className={`grid grid-cols-3 gap-3 mr-64`}>
                    {Object.entries(columns).map(([columnId, column]) => column.id !== 'members' && <section className="border max-h-[calc(100vh-6.5rem)] rounded-md py-3 pl-3 bg-white">
                        <div className='font-medium'>
                            <h1 className="text-2xl">{column?.title}</h1>
                            <p className="text-xs">Members : <span>{column?.items.length} / {column?.maxMember}</span></p>
                        </div>
                        <StrictModeDroppable droppableId={columnId} key={columnId} isDropDisabled={column?.items.length >= column?.maxMember}>

                            {(provided: any) => <div ref={provided.innerRef} {...provided.droppableProps}
                                className='flex flex-col w-full pr-3 h-[91%] overflow-y-auto overflow-x-hidden'>
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

            <section className={`fixed right-0 bg-white p-3 border-l border-sky-400 h-full max-h-full w-64`}>
                <h1 className="font-semibold text-2xl">Members</h1>
                <Input className="my-3 w-11/12" type="search" placeholder="Search" />
                <StrictModeDroppable droppableId={columns.members.id} key={columns.members.id} isDropDisabled={false}>

                    {(provided: any) => <div ref={provided.innerRef} {...provided.droppableProps}
                        className='max-h-[calc(100%-10rem)] h-full flex flex-col overflow-y-auto mb-16'>
                        {/* <main className="flex flex-col"> */}
                        {columns.members?.items.map((item: any, index: number) =>
                            <MemberCard additionalClass="mt-3" key={item.id} item={item} index={index} />)}
                        {provided.placeholder}
                        {/* </main> */}
                    </div>}

                </StrictModeDroppable>
            </section>
        </DragDropContext>

        <NewColumnProjectModal />
    </div>
}