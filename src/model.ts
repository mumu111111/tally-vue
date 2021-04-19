const localStorageKeyName = 'recordList'
const model = {
    //克隆list
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data))
    },
    // 获取localS
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
    },
    // 设置localS
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
    }
}
export { model }