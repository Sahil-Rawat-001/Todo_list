let submtBtn = document.getElementById('submtBtn');
let inptBox  = document.getElementById('inptBox');
let right_container = document.getElementById('right-container');
let data;
let count = 0;

get_Data();

// adding eventlistner for inptBox to add task when pressing enter
inptBox.addEventListener('keypress',function(event){

    if(event.key === 'Enter'){
      addTask();
    }
})

// adding eventlistner for submtBtn to add task when clicked
submtBtn.addEventListener('click',addTask);




function addTask(){
  
  // retrieving value from the input Box into the task_val variable
  let task_Val = inptBox.value;
  // console.log(task_Val);

  let task_obj = {
    task : task_Val,
    task_id : count++,
    is_complete : false,
  }

  createTask(task_obj);
  setData(task_obj);

}


function createTask(obj){

  // creating a div to show our task on screen with its functionalities
  let todo_div = document.createElement('div');

  // adding a class name to the var todo_div to style it
  todo_div.classList.add("todo_div");


  let li_item  = document.createElement('li');

  li_item.classList = "li_itm";
  

  // delete button
  let dlt_btn  = document.createElement('button');
  dlt_btn.textContent = "delete";
  dlt_btn.className = "dlt_btn";
  dlt_btn.addEventListener('click', function () {
     deleteTask(obj.task_id,todo_div);
  });

  if(obj.is_complete){
    li_item.classList.add('completed');
  }

  // check box
  let chk_box  = document.createElement('input');
  chk_box.classList.add("chk_box")
  chk_box.setAttribute('type','checkbox');
  chk_box.checked = obj.is_complete;

  chk_box.addEventListener('change',function(){
     updateTask(obj.task_id,li_item,chk_box.checked);
  })

  // edit button
  let edt_btn = document.createElement('button');
  edt_btn.classList.add("edt_btn");
  edt_btn.textContent = 'edit';
  edt_btn.addEventListener('click',function () {
    editTask(obj.task_id,li_item);
  });
  
  // task value
  li_item.innerText = obj.task;

  // appending the functionalities to the div element
  todo_div.append(li_item);
  todo_div.append(edt_btn);
  todo_div.append(dlt_btn);
  todo_div.append(chk_box);

  // appending all elements to the div
  right_container.append(todo_div);

  // this is for empty the input box after task addition
  inptBox.value = '';
}


// check box operation
function updateTask(tskid,l_itm,ischecked){
  
  for(let i = 0; i < data.length; i++){
     
     if(data[i].task_id === tskid){

       data[i].is_complete = ischecked;

       if(ischecked){
        l_itm.classList.add('completed');
       } else{
        l_itm.classList.remove('completed');
       }
       break;
     }
  }
  localStorage.setItem('tasks',JSON.stringify(data));
}



function deleteTask(taskid,el){
  // delete from local strorage 
  // let el = event.currentTarget;
  
  // let par_el = el.parentElement;
  
  let idx;

  for(let index = 0; index < data.length; index++){
    // checking the right task to delete
    if(data[index].task_id === taskid){
      idx = index;
      break;
    }
  }
  el.remove();
  data.splice(idx,1);// deleting task
  localStorage.setItem('tasks',JSON.stringify(data));// updating task in local memory
}

// set data function to store data in the browser
function setData(obj){

  data.push(obj);

  //methods to add data in localstorage
  localStorage.setItem('tasks',JSON.stringify(data));

}


function get_Data(){

  // Method for fetching data from the localstorage
  data = localStorage.getItem('tasks');
  if(data){ 
    data = JSON.parse(data);
  }
  else{
    data = [];
  }
  data.forEach(el => {
    createTask(el)
 });
}

function editTask(task, li_item){

  // creating an input element
  let input = document.createElement('input');
  input.type = 'text';
  input.value = li_item.innerText;
  input.classList.add('editTask');

  // console.log(input.value);
  // this add input box
  li_item.innerText = '';
  li_item.appendChild(input);
  input.focus();

  // when enter is pressed the value is edited
  input.addEventListener('keypress', function (event) {
     if(event.key === 'Enter'){
       saveEdit(task,li_item,input.value);
       input.classList.remove('editTask');
       input.remove();
     } 
  })

  input.addEventListener('blur', function (event) {
    saveEdit(task,li_item,input.value);
    input.remove();
  })
  
}

function saveEdit(task,li_item,newval){

  for(let i = 0; i < data.length;i++){
     
    if(data[i].task_id === task){
      data[i].task = newval;
      li_item.innerText = newval;
      break;
    }
  }
  localStorage.setItem('tasks',JSON.stringify(data));
}

