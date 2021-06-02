let allTasks = [];
let valueInput = '';
let input = null;
let indexEdit = -1;

window.onload = async function init() {
    input = document.getElementById('newTask');
    input.addEventListener('change', updateValue);
    const resp = await fetch('http://localhost:8080/allTasks', {
        method: 'GET'
    });
    let result = await resp.json();
    allTasks = result;
    render();
}

onClickButton = async () => {
    if(valueInput.length === 0) {
        alert('Enter your case !');
    } else {
    const resp = await fetch('http://localhost:8080/createTask', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify( {
            text: valueInput,
            isCheck: false
        })
    });
    let result = await resp.json();
    allTasks.push(result)
    valueInput = '';
    input.value = '';
    render();
    }
}//add new values by click on button

keyPress = async (event) => {
    if (event.keyCode == 13) {
        if(valueInput.length === 0) {
            alert('Enter your case !');
        } else {
            const resp = await fetch('http://localhost:8080/createTask', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify( {
                    text: valueInput,
                    isCheck: false
                })
            });
            let result = await resp.json();
            allTasks.push(result)
            };
        valueInput = '';
        input.value = '';
        render();
    }
}//add new values by Enter button


reset = (event) => {
    valueInput = '';
    input.value = '';
} //clear input button

updateValue = (event) => {
    valueInput = event.target.value;
} //update input value by change

render = () => {
    const content = document.getElementById('content_page');
    while(content.firstChild) {
        content.removeChild(content.firstChild);
    }

    allTasks.sort((a, b) => a.isCheck - b.isCheck); //sort flags, then push down
    
    allTasks.forEach((item, index) => { //creating textarea
        const container = document.createElement('div');
        container.className = 'task_container';

        if(index === indexEdit) {} else {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.isCheck;
            checkbox.onchange = () => {
                onChangeCheckBox(index)
        }
            container.appendChild(checkbox);
    }

        if(index === indexEdit) {
            const text = document.createElement('textarea');
            text.onkeydown = () => {
                enterFunc(text);
            }
            text.value = item.text;
            container.appendChild(text);

            const imgDone = document.createElement('img');
            imgDone.src = 'img/done.png';
            imgDone.className = 'editPng';
            imgDone.onclick = async () => {
                allTasks[indexEdit].text = text.value;
                const resp = await fetch('http://localhost:8080/updateTask', {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(allTasks[indexEdit])
                });
                let result = await resp.json();
                indexEdit = -1;
                text.value = '';
                render();
            }
            container.appendChild(imgDone);

            const imgCanc = document.createElement('img');
            imgCanc.src = 'img/cancel.webp';
            imgCanc.className = 'editPng';
            container.appendChild(imgCanc);
            imgCanc.onclick = function(text){
                indexEdit = -1;
                render();
            }
        } else {
            const text = document.createElement('p');
            text.innerText = item.text;
            text.className = item.isCheck ? 'done' : 'undone'
            container.appendChild(text);

            const imgEdit = document.createElement('img');
            imgEdit.src = 'img/dit.png';
            imgEdit.className = 'editPng';
            container.appendChild(imgEdit);
            if(item.isCheck === true) {
                    imgEdit.remove();
                }
            const imgDel = document.createElement('img');
            imgDel.src = 'img/delete.webp';
            imgDel.className = 'editPng';
            container.appendChild(imgDel);
            imgDel.onclick = () => {
                delFunc(index)
            };
    
            imgEdit.onclick = (text) => {
                indexEdit = index;
                render();
            }
        }
        content.appendChild(container);
    });
}//viewing array

delFunc = async (index) => {
    const resp = await fetch(`http://localhost:8080/deleteTask?_id=${allTasks[index]._id}`, {
        method: 'DELETE'
    });
    let result = await resp.json();
    allTasks.splice(index, 1);
    render()
} //deleting task

remove = async (index) => {
    allTasks.splice(index);
    const resp = await fetch(`http://localhost:8080/deleteTasks`, {
        method: 'DELETE'
    });
    let result = await resp.json();
    render()
} //deleting all tasks

onChangeCheckBox = (index) => {
    allTasks[index].isCheck = !allTasks[index].isCheck;
    render();
} //checkbox change function

enterFunc = (text) => {
    if (event.keyCode == 13 && !event.shiftKey) {
        async () => {
            allTasks[indexEdit].text = text.value;
            const resp = await fetch('http://localhost:8080/updateTask', {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(allTasks[indexEdit])
            });
            let result = await resp.json();
            text.value = '';
        }

        allTasks[indexEdit].text = text.value;
        indexEdit = -1;
        render();
    }
} //out of textarea only by Enter button

