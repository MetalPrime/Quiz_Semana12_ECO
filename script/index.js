// Get a reference to the database service
var database = firebase.database();

const addInput = document.querySelector('.add__input');
const addBtn = document.querySelector('.add__btn');

const listDo = document.querySelector('.activities__listDo');
const listDoing = document.querySelector('.activities__listDoing');
const listDone = document.querySelector('.activities__listDone');

var dragged;


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

function paintElements(elem) {
    listDo.innerHTML = '';
    listDoing.innerHTML = '';
    listDone.innerHTML = '';
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
}

database.ref('jobs').on('value', function (elem) {

    paintElements(elem);


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

                switch (statusTask.innerHTML) {
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
            });

            returnBtn.addEventListener('click', function (e) {

                switch (statusTask.innerHTML) {
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






            });

            document.addEventListener("dragstart", function(event) {
                // store a ref. on the dragged elem
                dragged = event.target;
                //ELEMENTO HTML SELECCIONADO

              }, false);

            /* events fired on the drop targets */
            document.addEventListener("dragover", function (event) {
                // prevent default to allow drop
                event.preventDefault();
            }, false);

            document.addEventListener("drop", function (event) {
                if(event.on)

                // prevent default action (open as link for some elements)
                event.preventDefault();
                // move dragged elem to the selected drop target
                console.log(event.target.className);

                if(dragged.querySelector('.task__id').innerHTML === idTask.innerHTML){
                    switch (event.target.className) {
                        case 'activities__do':
    
                            database.ref('jobs/' + task.querySelector('.task__id').innerHTML).set(
                                {
                                    id: task.querySelector('.task__id').innerHTML,
                                    status: 'do',
                                    description: task.querySelector('.task__job').innerHTML,
                                }
                            );
                            break;
                        case 'activities__doing':
    
                            database.ref('jobs/' + task.querySelector('.task__id').innerHTML).set(
                                {
                                    id: task.querySelector('.task__id').innerHTML,
                                    status: 'doing',
                                    description: task.querySelector('.task__job').innerHTML,
                                }
                            );
                            break;
                        case 'activities__done':
                            database.ref('jobs/' + task.querySelector('.task__id').innerHTML).set(
                                {
                                    id: task.querySelector('.task__id').innerHTML,
                                    status: 'done',
                                    description: task.querySelector('.task__job').innerHTML,
                                }
                            );
                            break;
                    }
                }
                
            }, false);

        }


    );




});





