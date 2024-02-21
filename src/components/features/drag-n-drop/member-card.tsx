import { Draggable } from 'react-beautiful-dnd';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from "@/assets/img/avatar.jpg"

type Props = {
    item: any,
    index: number,
    additionalClass?: string
}

export default function MemberCard({ item, index, additionalClass = '' }: Props) {
    return <Draggable draggableId={item.id} index={index}>
        {(provided: any) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            className={`border flex flex-col gap-1 items-center justify-center p-3 bg-white rounded-md w-full h-24 ${additionalClass}`}>

            <Avatar className="w-9 h-9 shadow shadow-sky-200">
                <AvatarImage src={avatar} />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className='text-center'>
                <p className='text-sm truncate'>{item.name}</p>
                <p className='text-[0.65rem] text-gray-600 truncate'>{item.role}</p>
            </div>

        </div>}
    </Draggable>
}