import { Draggable } from 'react-beautiful-dnd';

type Props = { implementForm?: boolean, item: any, index: number, txtChangeFn?: any, delFn?: any }

export default function FormItem({ implementForm = false, item, index, delFn }: Props) {
    return <Draggable draggableId={item.id} index={index}>
        {(provided: any) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            className='mt-5 border flex flex-col items-center justify-center p-3 bg-white rounded-md w-full h-auto'>
            <p className='text-xs mt-1'>{item.name}</p>
        </div>}
    </Draggable>
}