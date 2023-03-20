const tareas = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const addTarea = document.querySelector("#addTarea");
const idTarea = document.querySelector("#idTest");
const form = document.querySelector("#form");
const tareaNombre = document.querySelector("#tarea");

renderTime();
renderTareas();

form.addEventListener('submit', e => {
    e.preventDefault();
    if(idTarea.value !== ""){
        crearTarea(idTarea.value);
        idTarea.value = "";
        renderTareas();
    }
});

function crearTarea(value){
    const nuevaTarea = {
        id: (Math.random()*100).toString(36).slice(3),
        titulo: value,
        completado: false
    }

    tareas.unshift(nuevaTarea);
}

function renderTareas(){
    const html = tareas.map(tarea => {
        return `
            <div class="miTarea">
                <div class="completado">${tarea.completado ? `<span class="finalizado">Finalizado</span>` : `<button class="start-button" data-id="${tarea.id}">Empezar</button>`}</div>
                <div class="titulo">${tarea.titulo}</div>
            </div>
        `;
    } );

    const tareaContenido = document.querySelector("#task");
    tareaContenido.innerHTML = html.join('');

    const empezarBoton = document.querySelectorAll(".start-button")
    empezarBoton.forEach(boton => {
        boton.addEventListener("click", e =>{
            if(!timer){
                const id = boton.getAttribute("data-id");
                empezarBotonHandler(id)
                boton.textContent = "En progreso...";
            }
        })
    })
};


function empezarBotonHandler(id){
    time = 25*60;
    current = id;
    //Almacenar la index del array cuando encuentre coincidencia
    const tareaIndex = tareas.findIndex((tarea) => tarea.id == id);
    tareaNombre.textContent = tareas[tareaIndex].titulo;
    renderTime()
    timer = setInterval(() =>{
        timeHandler(id);
    }, 1000);
}

function timeHandler(id) {
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        markCompletado(id);
        timer = null;
        renderTareas();
        startBreak();
    }
}

function startBreak() {
    time = 5*60;
    tareaNombre.textContent = "Descanso...";
    renderTime()
    timerBreak = setInterval(() =>{
        timerBreakHandler();
    }, 1000)
}
function timerBreakHandler(){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        tareaNombre.textContent = "";
        renderTareas();
    }
}

function renderTime(){
    const timeDiv = document.querySelector("#time #valor");
    const minutos = parseInt(time / 60);
    const segundos =  parseInt(time % 60);

    timeDiv.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}


function markCompletado(id){
    const tareaIndex = tareas.findIndex((tarea) => tarea.id == id);
    tareas[tareaIndex].completado = true;
}