// Definir la lista de ejercicios
var listaEjercicios = [
    "Sentadilla",
    "Press de Banca",
    "Peso Muerto",
    "Press Militar",
    "Remo con Barra",
    "Flexiones",
    "Dominadas",
    "Fondos en Paralelas",
    "Curl de Bíceps",
    "Tríceps en Polea",
    "Prensa de Piernas",
    "Hip Thrust",
    "Plancha",
    "Crunch",
    "Russian Twist",
    "Pull-ups",
    "Push-ups",
    "Deadlift Sumo",
    "Box Jumps",
    "Clean and Jerk"
];

document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("exerciseInput");
    var suggestionsContainer = document.getElementById("suggestions");

    input.addEventListener("input", function () {
        var inputValue = input.value.toLowerCase();
        var filteredExercises = listaEjercicios.filter(function (exercise) {
            return exercise.toLowerCase().includes(inputValue);
        });

        mostrarSugerencias(filteredExercises);
    });

    input.addEventListener("focusout", function () {
        // Limpiar las sugerencias cuando el campo de búsqueda pierde el foco
        setTimeout(function () {
            suggestionsContainer.innerHTML = "";
        }, 200);
    });

    // Inicializar el componente "awesomplete" en el campo de búsqueda
    var input = document.getElementById("exerciseInput");
    

    // Obtener y mostrar el historial de ejercicios realizados al cargar la página
    mostrarHistorialEjercicios();
});

function mostrarSugerencias(suggestions) {
    var suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";

    suggestions.forEach(function (exercise) {
        var suggestionElement = document.createElement("div");
        suggestionElement.className = "suggestion";
        suggestionElement.textContent = exercise;

        suggestionElement.addEventListener("click", function () {
            input.value = exercise;
            suggestionsContainer.innerHTML = "";
        });

        suggestionsContainer.appendChild(suggestionElement);
    });
}

function mostrarHistorialEjercicios() {
    var historialEjercicios = JSON.parse(localStorage.getItem('historialEjercicios')) || [];

    var historialContainer = document.getElementById('historialEjercicios');
    historialContainer.innerHTML = '';

    historialEjercicios.forEach(function (registro) {
        var ejercicioDiv = document.createElement('div');
        ejercicioDiv.className = 'historial-item';

        var fechaParrafo = document.createElement('p');
        fechaParrafo.textContent = 'Fecha: ' + registro.fecha;

        var ejercicioParrafo = document.createElement('p');
        ejercicioParrafo.textContent = 'Ejercicio: ' + registro.ejercicio;

        var volumenParrafo = document.createElement('p');
        volumenParrafo.textContent = 'Volumen: ' + registro.volumen + ' kg';

        ejercicioDiv.appendChild(fechaParrafo);
        ejercicioDiv.appendChild(ejercicioParrafo);
        ejercicioDiv.appendChild(volumenParrafo);

        historialContainer.appendChild(ejercicioDiv);
    });
}

function registrarEntrenamiento() {
    var exercise = document.getElementById('exerciseInput').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var weight = document.getElementById('weight').value;

    var volumen = sets * reps * weight;
    var fecha = obtenerFechaActual();

    var entrenamiento = {
        ejercicio: exercise,
        sets: sets,
        reps: reps,
        peso: weight,
        volumen: volumen,
        fecha: fecha
    };

    // Obtener los entrenamientos almacenados actualmente
    var entrenamientosGuardados = JSON.parse(localStorage.getItem('entrenamientos')) || [];

    // Agregar el nuevo entrenamiento a la lista
    entrenamientosGuardados.push(entrenamiento);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('entrenamientos', JSON.stringify(entrenamientosGuardados));

    // Guardar el entrenamiento en el historial de ejercicios realizados
    var historialEjercicios = JSON.parse(localStorage.getItem('historialEjercicios')) || [];
    historialEjercicios.push(entrenamiento);
    localStorage.setItem('historialEjercicios', JSON.stringify(historialEjercicios));

    // Mostrar mensaje de éxito
    document.getElementById('resultado').innerHTML = 'Entrenamiento registrado exitosamente.';

    // Limpiar los campos después de registrar el entrenamiento
    limpiarCampos();

    // Actualizar el historial de ejercicios en la página
    mostrarHistorialEjercicios();
}

function limpiarCampos() {
    document.getElementById('exerciseInput').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
}

function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var año = fecha.getFullYear();

    return dia + '/' + mes + '/' + año;
}
