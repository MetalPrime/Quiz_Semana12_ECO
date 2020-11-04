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

        let reference = database.ref('jobs/do').push();
        let task = {
            id : reference.key,
            description : addInput.value,
        }

        database.ref('jobs/do').push().set(task);
    }
});


database.ref('jobs/do').on('value', function(data) {
    listDo.innerHTML = '';

    data.forEach(
        task => {
            let value = task.val();
            let newTask = new Task(value);
            listDo.appendChild(newTask.render());
        }
    );

});

