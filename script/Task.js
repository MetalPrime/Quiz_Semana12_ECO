class Task{

    constructor(task){
        this.task = task;
        this.status = this.task.status;
        this.time = new Date();
        this.currentTime = this.time.getDate() +"/"+ (this.time.getMonth()+1) +"/"+ this.time.getFullYear();
    }

    render = () => {
        let component = document.createElement('article');
        component.classList.add("task");
        component.setAttribute('draggable',true);


        component.innerHTML = `
        <div class="task__info">
            <p class="task__time">${this.currentTime}</p>
            <p class="task__job">${this.task.description}</p>
            <p class="task__id">${this.task.id}</p>
            <p class="task__status">${this.task.status}</p>

        </div>
        <button class="task__delete">Delete</button>
        <button class="task__pass">Pass</button>
        <button class="task__return">Return</button>
        `;

        return component;
    }
}