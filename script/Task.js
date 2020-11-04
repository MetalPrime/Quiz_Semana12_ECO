class Task{

    constructor(task){
        this.task = task;
        this.time = Date.now();
    }

    render = () => {
        let component = document.createElement('article');
        component.classList.add("task");


        component.innerHTML = `
        <div class="task__info>
            <p class="task__time">${this.time}</p>
            <p class="task__job">${this.task.description}</p>
        </div>
        <button class="task__delete">Delete</button>
        <button class="task__pass">Pass</button>
        <button class="task__return">Return</button>
        `;

        return component;
    }
}