
const storage = new StorageManager("itemList");

document.addEventListener('DOMContentLoaded',()=>{
    renderItemList();
});

function renderItemList(){
    document.querySelector('.itemList').innerHTML = '';
    let itemList = storage.getItemList();
    for(let item of itemList){
        const itemObj = new Item(item.id,item.description,item.deadline,item.completed);
        itemObj.render(".itemList");
    }
}

function deleteItem(event){
    if(confirm("Do you want to delete this item?")){
        let parent_node = event.path.filter(node => node.classList && node.classList.contains('item'))[0];
        let id = parent_node.dataset.id;
        storage.deleteItem(id);
        renderItemList();
    }
}

function markAsCompleted(event){
    let parent_node = event.path.filter(node => node.classList && node.classList.contains('item'))[0];
    let id = parent_node.dataset.id;
    if(event.target.checked){
        parent_node.classList.add('completed'); 
        storage.updateItem(id,'completed',true);
        storage.sort("completeAsc");
        renderItemList();
    }
    else{
       parent_node.classList.remove('completed'); 
       storage.updateItem(id,'completed',false);
    }
}

function addItem(event){
    let description = document.querySelector("[name = description]");
    let deadline = document.querySelector("[name = deadline]");
    let id = Date.now();

    const item = new Item(id,description.value,deadline.value);
    description.value = '';
    deadline.value = '';
    storage.appendItemList(item);
    renderItemList();
}

function sortBy(sortBy){
    storage.sort(sortBy);
    renderItemList();
}