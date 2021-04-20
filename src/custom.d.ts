type TagItem = {
    name: string;
    value: string;
}

type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createdAt?: Date
}