function saveTask() {
    
    let _title = document.getElementById('title').value;
    let _descri = document.getElementById('descri').value;
    let _id = Date.now(); //obtiene en milisegundos tiempo actual, numero unico
    
    var task = {
        title : _title,
        descri: _descri,
        id : _id
    };
    
    if (localStorage.getItem('tasks') === null) {
    	let tasks = [];
    	tasks.push(task);
    	localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
    	let tasks = JSON.parse(localStorage.getItem('tasks'));
    	tasks.push(task);
    	localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addHTMLTask(task.title, task.descri, task.id, true);
}

function addHTMLTask(title, descri, id, applyFadeIn){
	let tasksView = document.getElementById('tareas');
	tasksView.innerHTML = 
        '<div id="' + id + '" class="card">'+
           ' <div class="card-body">' + 
                '<h3>' + title + ' </h3>' +
                '<hr/>' + 
                '<span>' + descri + '</span>'+
                '<div class="actionsContainer">' +
                    '<a class="btn" onclick="taskCompleted(' + id + ');">Completada</a>'+
                '</div>' +
            '</div>'+
        '</div>'
        +
        tasksView.innerHTML; 

        overlay_hide();

        if(applyFadeIn){
        	fadeIn(document.querySelector("#tareas .card:first-of-type"), 800);	
        }
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

	if(tasks === null){
		return;
	}

    let tasksView = document.getElementById('tareas');
    tasksView.innerHTML = '';
    
    for(let i = 0; i < tasks.length; i++) {
       // console.log(tasks[i])  -  Mostrar en consola las tareas
        let title = tasks[i].title;
        let descri = tasks[i].descri;
        let id = tasks[i].id;
        
        addHTMLTask(title, descri, id, false);
    }
}

function taskCompleted(cardID) {
   // console.log(title);
    
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
    	if (tasks[i].id === cardID) {
    		tasks.splice(i, 1); 
    	}
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
   
    $("div#" + cardID).fadeOut(800, function(){
    	$("div#" + cardID).remove();
    });

    //getTasks(); 

   /* var el = document.querySelector("#tasks #" + cardID);
    el.parentElement.remove(el);*/
}



function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function limpiarFormDesign(){
	$('#formDesing input[type="text"], #formDesing textarea').val('');
}


function overlay_show() {
    document.getElementById("overlay").style.display = "block";
}

function overlay_hide() {
    document.getElementById("overlay").style.display = "none";
} 

document.addEventListener("DOMContentLoaded", function(){
    $("#btnNuevaTarea").click(function(){
        overlay_show();
    });

    $("#btn_submit").click(function () {
    	saveTask();
    	limpiarFormDesign();
    	overlay_hide();
    });

    $("#btn_clear").click(function(){
    	limpiarFormDesign();
    	overlay_hide();
    });

    $("#txtBuscar").on('input',function(e){
    	$("#tareas").html("");
    	let taskList = [];
	    let tasks = JSON.parse(localStorage.getItem('tasks'));
	    if($.trim($("#txtBuscar").val()) === ""){
	    	getTasks();
	    	return;
	    }

	    for (let i = 0; i < tasks.length; i++) {
	    	if (tasks[i].title.includes($("#txtBuscar").val())) {
	    		taskList.push(tasks[i]);
	    		addHTMLTask(tasks[i].title, tasks[i].descri, tasks[i].id, false);
	    	}
	    }
	});
    
    getTasks();
  
  
  /*
  document.querySelector(".card .btn").addEventListener("click", function(){
  	tareaCompletada(this.parentElement.parentElement);
  });
  */


//query
/*
  $('.card .btn').click(function(el){
  	$(el).remove();
  });
  */ 
});   


