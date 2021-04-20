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
    create: (name: string) => 'success' | 'duplicated', // 联合类型 取值可以为多种类型中的一种
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated',
    remove: (id: string) => boolean,
    save: () => void
}
// 具体方法  
const tagListModel: TagListModel = {
    // tag结构的数据
    data: [],
    // 获取locaS数据
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[{ "id": "衣", "name": "衣" }]')
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
    //  更改标签
    update(id, name) {
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            // 存在 id 
            const names = this.data.map(item => item.name)
            // 重复
            if (names.indexOf(name) >= 0) {
                return 'duplicated'
            } else {
                // 成功
                const tag = this.data.filter(item => item.id === id)[0]
                tag.id = tag.name = name
                this.save()
                return 'success'
            }
        } else {
            return 'not found'
        }
    },
    // 删除
    remove(id: string) {
        let index = -1
        for (let i = 0; this.data.length; i++) {
            if (this.data[i].id == id) {
                index = i
                break;
            }
        }
        this.data.splice(index, 1)
        this.save()
        return true;
    },
    //存入locals
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
    }

}
export { tagListModel }
