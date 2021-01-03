class Item {
    constructor(id,description, deadline, completed = false){
        this.id = id;
        this.description = description;
        this.deadline = deadline;
        this.completed = completed;
        this.time_left = this.calculatetimeLeft(deadline);
    }

    calculatetimeLeft(deadline){
        let now = Date.now();
        let timeLeft = new Date(deadline).getTime() - now;
        return timeLeft;
    }

    formatTimeLeft(){
        var days = Math.floor(this.time_left / (1000 * 60 * 60 * 24));
        var hours = Math.floor((this.time_left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((this.time_left % (1000 * 60 * 60)) / (1000 * 60));
        if(isNaN(days) || isNaN(hours) || isNaN(minutes)) return '';
        return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
    }

    render(selector){
        const element = document.querySelector(selector);
        let template = 
        `<div class="item ${this.completed ? "completed" : ""}" data-id="${this.id}">
            <div class="info">
                <h3>${this.description}</h3>
                <p>${this.deadline.length ? "Time left : " : ""} ${this.formatTimeLeft()}</p>
            </div>
            <div class="buttons">
                <input type="checkbox" class="checkbox" onchange="markAsCompleted(event)" ${this.completed ? "checked" : ""}>
        
                <button class="delete_button" onclick="deleteItem(event)">
                    <img class="delete_icon" src="./assets/delete_icon.png" alt="">
                </button>
            </div>
        </div>`;
        element.innerHTML += template;
    }
}