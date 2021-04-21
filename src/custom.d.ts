type TagItem = {
    name: string;
    value: string;
}

type RecordItem = {
    tags: TagItem
    notes: string
    type: string
    amount: number
    createdAt?: Date
}