class Task{

    constructor(task){
        this.task = task;
    }

    render = () => {
        let component = document.createElement('article');
        component.classList.add("task");

        component.innerHTML = `
        <div class="task__info>
            <p class="task__time"></p>
            <p class="task__job"></p>
        </div>
        <b class="task__delete">Delete</b>
        <b class="task__pass">Pass</b>
        <b class="task__return">Return</b>
        `;

    }
}