const localStorageKeyName = 'tagList'
// 将原先tag的string 改成{id,name}
type Tag = {
    id: string,
    name: string
}
// 设计数据和方法 及返回的值
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplicated',
    save: () => void
}
// 具体方法  
const tagListModel: TagListModel = {
    // tag结构的数据
    data: [],
    // 获取locaS数据
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
        return this.data
    },
    // 新增标签是否重复 不重复 存入locals
    create(name) {
        const names = this.data.map(item => item.name)
        if (names.indexOf(name) >= 0) {
            return 'duplicated'
        }
        this.data.push({ id: name, name: name })
        this.save()
        return 'success'
    },
    //存入locals
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }

}
export { tagListModel }
