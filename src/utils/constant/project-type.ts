export type IProjectItemType = {
    id: string
    name: string
    role: string
}

export type IProjectDataType = {
    id: string
    title: string
    items: IProjectItemType[]
    maxMember?: number
}

export type IProjectStateType = {
    [key: string]: IProjectDataType
    members: IProjectDataType
}