class StorageManager{
    constructor(storage_key){
        this.storage_key = storage_key;
    }

    getItemList(){
        let itemList = sessionStorage.getItem(this.storage_key) || '[]';
        return JSON.parse(itemList);
    }

    appendItemList(item){
        let itemList = this.getItemList();
        itemList.push(item);
        sessionStorage.setItem(this.storage_key, JSON.stringify(itemList));
    }

    deleteItem(id){
        let itemList = this.getItemList();
        let new_itemList = itemList.filter(v=>v.id != id);
        sessionStorage.setItem(this.storage_key, JSON.stringify(new_itemList));
    }

    updateItem(id, property, value){
        let itemList = this.getItemList();
        let index = itemList.findIndex(v=>v.id == id);
        itemList[index][property] = value;
        sessionStorage.setItem(this.storage_key, JSON.stringify(itemList));
    }

    sort(sortType){
        let itemList = storage.getItemList();
        itemList.sort(this[sortType]);
        sessionStorage.setItem(this.storage_key, JSON.stringify(itemList));
    }

    //sorting functions
    completeDesc(a,b){
        if(a.completed && !b.completed){
            return -1;
        }else if(!a.completed && b.completed){
            return 1;
        }
        return 0;
    }
    completeAsc(a,b){
        if(a.completed && !b.completed){
            return 1;
        }else if(!a.completed && b.completed){
            return -1;
        }
        return 0;
    }

    timeLeftAsc(a,b){
        return a.time_left - b.time_left;
    }

    timeLeftDesc(a,b){
        return b.time_left - a.time_left;
    }


}