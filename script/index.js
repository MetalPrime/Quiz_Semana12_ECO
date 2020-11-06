// Get a reference to the database service
var database = firebase.database();

const addInput = document.querySelector('.add__input');
const addBtn = document.querySelector('.add__btn');

const listDo = document.querySelector('.activities__listDo');
const listDoing = document.querySelector('.activities__listDoing');
const listDone = document.querySelector('.activities__listDone');



addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (addInput.value === '') {
        alert("Campo Vacio");
    } else {

        let reference = database.ref('jobs').push();
        let task = {
            id: reference.key,
            description: addInput.value,
            status: 'do',
        }

        reference.set(task);
    }
});


database.ref('jobs').on('value', function (elem) {
    listDo.innerHTML = '';
    let newTask;
    let value;

    elem.forEach(
        task => {
            value = task.val();
            newTask = new Task(value);
            console.log(newTask.status);
            switch (newTask.status) {
                case 'do':
                    listDo.appendChild(newTask.render());
                    break;
                case 'doing':
                    listDoing.appendChild(newTask.render());
                    break;
                case 'done':
                    listDone.appendChild(newTask.render());
                    break;
            }


        }
    );



    const tasks = document.querySelectorAll('.task');

    tasks.forEach(

        task => {
            var idTask = task.querySelector('.task__id');
            var inputTask = task.querySelector('.task__job');
            var passBtn = task.querySelector('.task__pass');
            var returnBtn = task.querySelector('.task__return');
            var deleteBtn = task.querySelector('.task__delete');
            var statusTask = task.querySelector('.task__status');

            switch (statusTask.innerHTML) {
                case 'do':
                    task.classList.add('task__do');
                    task.classList.remove('task__doing');
                    task.classList.remove('task__done');
                    break;
                case 'doing':
                    task.classList.remove('task__do');
                    task.classList.add('task__doing');
                    task.classList.remove('task__done');
                    break;
                case 'done':
                    task.classList.remove('task__do');
                    task.classList.remove('task__doing');
                    task.classList.add('task__done');
                    break;
            }

            // Selecciona la tarea y la elimina sin importar su locación
            deleteBtn.addEventListener('click', function (e) {
                e.preventDefault();
                database.ref('jobs/' + idTask.innerHTML).remove();

            });


            passBtn.addEventListener('click', function () {
                switch(statusTask.innerHTML){
                    case 'do':
                        database.ref('jobs/' + idTask.innerHTML).set(
                            {
                                id: idTask.innerHTML,
                                status: 'doing',
                                description: inputTask.innerHTML,
                            }
                        );
                        break;
                    case 'doing':
                        database.ref('jobs/' + idTask.innerHTML).set(
                            {
                                id: idTask.innerHTML,
                                status: 'done',
                                description: inputTask.innerHTML,
                            }
    
                        );
                        break;
                    default:
                        console.log('error in the change');
                        break;
                }
                window.location.reload(); 
            });

            returnBtn.addEventListener('click', function(e) {
                
                switch(statusTask.innerHTML){
                    case 'doing':
                        database.ref('jobs/' + idTask.innerHTML).set(
                            {
                                id: idTask.innerHTML,
                                status: 'do',
                                description: inputTask.innerHTML,
                            }
    
                        );
                        break;
                    case 'done':
                        database.ref('jobs/' + idTask.innerHTML).set(
                            {
                                id: idTask.innerHTML,
                                status: 'doing',
                                description: inputTask.innerHTML,
                            }
    
                        );
                        break;
                    default:
                        console.log('error in the change');
                        break;
                }
                window.location.reload(); 

            });
        }
    );


});





