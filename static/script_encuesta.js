document.addEventListener('DOMContentLoaded', () => {
    // --- ESTRUCTURA DE DATOS PARA PREGUNTAS ---
    const preguntas = [
        {
            id: 1,
            texto: "¿Qué tanto disfrutas realizar la siguiente actividad? Escribir código o programar, 1 la que menos disfruta y 5 la que mas disfruta",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 2,
            texto: "¿Qué tanto disfrutas realizar la siguiente actividad? Investigar sobre reacciones químicas o experimentos de laboratorio, 1 la que menos disfruta y 5 la que mas disfruta",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]

        },
        {
            id: 3,
            texto: "¿Qué tanto disfrutas realizar la siguiente actividad? Diseñar mecanismos electrónicos o automatizar procesos, 1 la que menos disfruta y 5 la que mas disfruta",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 4,
            texto: "¿Qué tanto disfrutas realizar la siguiente actividad? Aprender idiomas o conocer nuevas culturas, 1 la que menos disfruta y 5 la que mas disfruta",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 5,
            texto: "¿Qué tanto disfrutas realizar la siguiente actividad? Estudiar cómo vender un producto o analizar tendencias de consumo, 1 la que menos disfruta y 5 la que mas disfruta",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 6,
            texto: "¿En cuáles de estas áreas consideras que tienes habilidad o facilidad? (Selecciona hasta 3)",
            tipo: 'checkbox',
            opciones: [
                { valor: 'Razonamiento lógico o matemático', texto: 'Razonamiento lógico o matemático' },
                { valor: 'Comunicación oral y escrita', texto: 'Comunicación oral y escrita' },
                { valor: 'Creatividad para resolver problemas técnicos', texto: 'Creatividad para resolver problemas técnicos' },
                { valor: 'Persuasión o influencia en los demásd4', texto: 'Persuasión o influencia en los demás' },
                { valor: 'Traducción o comprensión de textos en otros idiomasd5', texto: 'Traducción o comprensión de textos en otros idiomas' }
            ]
        },        
        

        {
            id: 7,
            texto: "¿Qué entorno de trabajo te resulta más atractivo?",
            tipo: 'radio',
            opciones: [
                { valor: 'En una oficina desarrollando software o sistemas informáticos', texto: 'En una oficina desarrollando software o sistemas informáticos' },
                { valor: 'En un laboratorio analizando materiales o sustancias', texto: 'En un laboratorio analizando materiales o sustancias' },
                { valor: 'En una planta de automatización o taller técnico', texto: 'En una planta de automatización o taller técnico' },
                { valor: 'Enseñando o trabajando con idiomas en el extranjero', texto: 'Enseñando o trabajando con idiomas en el extranjero' },
                { valor: 'En una agencia de publicidad o liderando campañas comerciales', texto: 'En una agencia de publicidad o liderando campañas comerciales' }
            ]
        },
        {
            id: 8,
            texto: "selecciona la frase con la cual sientas mas afinidad",
            tipo: 'radio',
            opciones: [
                { valor: 'Me gusta analizar datos y patrones', texto: 'Me gusta analizar datos y patrones' },
                { valor: 'Prefiero trabajar con fórmulas y sustancias', texto: 'Prefiero trabajar con fórmulas y sustancias' },
                { valor: 'Me interesa cómo funciona un robot o mecanismo', texto: 'Me interesa cómo funciona un robot o mecanismo' },
                { valor: 'Disfruto resolver retos lógicos', texto: 'Disfruto resolver retos lógicos' },
                { valor: 'Me gusta expresar ideas y persuadir personas', texto: 'Me gusta expresar ideas y persuadir personas' },
                { valor: 'Prefiero trabajar con palabras o discursos', texto: 'Prefiero trabajar con palabras o discursos' },
                { valor: 'Me interesa cómo influye una marca en la gente', texto: 'Me interesa cómo influye una marca en la gente' },
                { valor: 'Disfruto aprender nuevas lenguas o acentos', texto: 'Disfruto aprender nuevas lenguas o acentos' }
            ]
        },
        {
            id: 9,
            texto: "Me gusta mas:",
            tipo: 'radio',
            opciones: [
                { valor: 'Entender como se estructura un idioma y sus culturas', texto:'Entender como se estructura un idioma y sus culturas' },
                { valor: 'Entender como funcionan los programas y algoritmos', texto: 'Entender como funcionan los programas y algoritmos' }
            ]
        },
        {
            id: 10,
            texto: "Me llama mas la atención:",
            tipo: 'radio',
            opciones: [
                { valor: 'Inventar mecanismos o automatizar cosas', texto: 'Inventar mecanismos o automatizar cosas' },
                { valor: 'Desarrollar fórmulas o productos químicos nuevos', texto: 'Desarrollar fórmulas o productos químicos nuevos' }
            ]
        },
        {
            id: 11,
            texto: "¿Qué importancia le das a lo siguiente al elegir tu carrera? Posibilidades de innovación o desarrollo tecnológico,1 poca importancia y 5 mucha importancia",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 12,
            texto: "¿Qué importancia le das a lo siguiente al elegir tu carrera? Posibilidad de trabajar en industria o laboratorios,1 poca importancia y 5 mucha importancia",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 13,
            texto: "¿Qué importancia le das a lo siguiente al elegir tu carrera? Oportunidad de viajar o tener contacto intercultural, 1 poca importancia y 5 mucha importancia",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },                       
        {
            id: 14,
            texto: "¿Qué importancia le das a lo siguiente al elegir tu carrera? Creatividad para diseñar campañas o soluciones,1 poca importancia y 5 mucha importancia",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
        {
            id: 15,
            texto: "¿Qué importancia le das a lo siguiente al elegir tu carrera? Contribuir al desarrollo de la ciencia o salud,1 poca importancia y 5 mucha importancia",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },            
        {
            id:16,
            texto:"Ordene las carreras de acuerdo a su preferencia, 1 la que menos le gusta y 5 la que mas le gusta, Ingeniería de Sistemas",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
                {
            id:17,
            texto:"Ordene las carreras de acuerdo a su preferencia, 1 la que menos le gusta y 5 la que mas le gusta, Mercadeo",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
                {
            id:18,
            texto:"Ordene las carreras de acuerdo a su preferencia, 1 la que menos le gusta y 5 la que mas le gusta, Ingeniería de Sistemas, Lenguas Modernas",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        },
                {
            id:19,
            texto:"Ordene las carreras de acuerdo a su preferencia, 1 la que menos le gusta y 5 la que mas le gusta, Ingeniería Química",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]




             
        },
        {
            id:20,
            texto:"Ordene las carreras de acuerdo a su preferencia, 1 la que menos le gusta y 5 la que mas le gusta, Ingeniería Mecatronica",
            tipo: 'radio',
            opciones: [
                { valor: '1', texto: '1' },
                { valor: '2', texto: '2' },
                { valor: '3', texto: '3' },
                { valor: '4', texto: '4' },
                { valor: '5', texto: '5' }
            ]
        }    
    ];

    // --- VARIABLES GLOBALES ---
    let preguntaActualIndex = 0;
    const respuestasUsuario = new Array(preguntas.length).fill(null);

    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    // Ya no necesitamos una referencia separada para 'numeroPreguntaSpan' si reescribimos el HTML del padre.
    const totalPreguntasSpan = document.querySelector('.barra-progreso > span'); // Selector más específico para el span que contiene el texto
    const progresoBarra = document.querySelector('.progreso');
    const preguntaTitulo = document.querySelector('.pregunta h2');
    const formulario = document.getElementById('formulario');
    const botonAnterior = document.getElementById('anterior');
    const botonSiguiente = document.getElementById('siguiente');
    const botonFinalizar = document.getElementById('Finalizar'); // Botón de finalizar encuesta
    const procesarUrl = document.body.dataset.procesarUrl;
    fetch(procesarUrl)
    // --- FUNCIONES ---

    function mostrarPregunta() {
        const pregunta = preguntas[preguntaActualIndex];
        preguntaTitulo.textContent = pregunta.texto;
        formulario.innerHTML = ''; // Limpiar opciones anteriores

        pregunta.opciones.forEach(opcion => {
            const etiqueta = document.createElement('label');
            const input = document.createElement('input');
            input.type = pregunta.tipo;
            input.name = pregunta.tipo === 'radio' ? 'respuesta' : `opcion_${pregunta.id}_${opcion.valor}`;
            input.value = opcion.valor;
            // CORRECCIÓN: ID único para cada input/opción
            input.id = `opcion-${pregunta.id}-${opcion.valor}`;

            const respuestaGuardada = respuestasUsuario[preguntaActualIndex];
            if (respuestaGuardada) {
                if (pregunta.tipo === 'radio' && respuestaGuardada === opcion.valor) {
                    input.checked = true;
                } else if (pregunta.tipo === 'checkbox' && Array.isArray(respuestaGuardada) && respuestaGuardada.includes(opcion.valor)) {
                    input.checked = true;
                }
            }

            etiqueta.appendChild(input);
            etiqueta.appendChild(document.createTextNode(` ${opcion.texto}`));
            formulario.appendChild(etiqueta);
        });

        actualizarBarraProgreso();
        actualizarBotonesNavegacion();
    }


    function guardarRespuesta() {
        const pregunta = preguntas[preguntaActualIndex];
        if (pregunta.tipo === 'radio') {
            const opcionSeleccionada = formulario.querySelector('input[name="respuesta"]:checked');
            respuestasUsuario[preguntaActualIndex] = opcionSeleccionada ? opcionSeleccionada.value : null;
        } else if (pregunta.tipo === 'checkbox') {
            const opcionesSeleccionadas = [];
            // Usamos un selector que encuentre los checkboxes por su 'type' y que estén 'checked'
            formulario.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                opcionesSeleccionadas.push(checkbox.value);
            });
            console.log(`Arreglo generado para la pregunta (checkbox) ID ${pregunta.id} ("${pregunta.texto.substring(0, 30)}..."):`, opcionesSeleccionadas);
            respuestasUsuario[preguntaActualIndex] = opcionesSeleccionadas.length > 0 ? opcionesSeleccionadas : null;
        }
    }

    /**
     * Actualiza la barra de progreso (texto y visual).
     * Reescribe el contenido del span de progreso para asegurar que se actualiza correctamente.
     */
    function actualizarBarraProgreso() {
        const totalPreguntas = preguntas.length;
        const numeroPreguntaActual = preguntaActualIndex + 1;

        if (totalPreguntasSpan) { // Verificar que el elemento exista
             totalPreguntasSpan.innerHTML = `Pregunta <span id="numeroPregunta">${numeroPreguntaActual}</span> de ${totalPreguntas}`;
        }

        const porcentaje = (numeroPreguntaActual / totalPreguntas) * 100;
        progresoBarra.style.width = `${porcentaje}%`;
    }

    function actualizarBotonesNavegacion() {
        botonAnterior.disabled = preguntaActualIndex === 0;

        if (!botonSiguiente || !botonFinalizar) {
            console.error("Botón Siguiente o Finalizar no encontrado. Verifica los IDs.");
            return;
        }

        if (preguntaActualIndex === preguntas.length - 1) { // Si es la última pregunta
            botonSiguiente.style.display = 'none';
            botonFinalizar.style.display = 'inline-block'; // o 'block' según tu CSS
        } else { // Si NO es la última pregunta
            botonSiguiente.style.display = 'inline-block'; // o 'block'
            botonFinalizar.style.display = 'none';
            botonSiguiente.textContent = 'Siguiente';
        }
    }

    function validarRespuesta() {
        const pregunta = preguntas[preguntaActualIndex];
        if (pregunta.tipo === 'radio') {
            if (!formulario.querySelector('input[name="respuesta"]:checked')) {
                alert('Por favor, selecciona una opción.');
                return false;
            }
        }
        else if (pregunta.tipo === 'checkbox' && pregunta.id === 6) { // Validación específica para la pregunta 6
            const opcionesSeleccionadas = formulario.querySelectorAll('input[type="checkbox"]:checked').length;
            if (opcionesSeleccionadas !== 3) {
                alert('Por favor, selecciona exactamente 3 opciones para esta pregunta.');
                return false;
            }
          }
        
        return true;
    }

        // --- MANEJADORES DE EVENTOS ---
    botonSiguiente.addEventListener('click', () => {
        if (!validarRespuesta()) {
            return;
        }
        guardarRespuesta();

        if (preguntaActualIndex < preguntas.length - 1) {
            preguntaActualIndex++;
            mostrarPregunta();
        }
        // No hay bloque 'else' aquí para la finalización.
        // La visibilidad de 'Finalizar' se maneja en actualizarBotonesNavegacion.
    });

    botonAnterior.addEventListener('click', () => {
        if (preguntaActualIndex > 0) {
            guardarRespuesta(); // Guardar la respuesta actual antes de retroceder
            preguntaActualIndex--;
            mostrarPregunta();
        }
    });


if (botonFinalizar) {
    botonFinalizar.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') { // Si "Finalizar" es un <a>
            event.preventDefault(); // Prevenir la navegación por defecto del enlace
        }

        // 1. Validar la respuesta actual (la última pregunta)
        if (!validarRespuesta()) {
            return; // Salir si la validación falla
        }

        // 2. Guardar la respuesta actual
        guardarRespuesta();
        console.log('Respuestas del usuario:', respuestasUsuario);

        // 3. Formatear las respuestas como JSON
        const datosJSON = JSON.stringify(respuestasUsuario);
        console.log('Enviando JSON:', datosJSON);                   

        // 4. Actualizar UI para indicar procesamiento y deshabilitar botones
        if (preguntaTitulo) preguntaTitulo.textContent = 'Procesando tus respuestas...';
        if (formulario) formulario.innerHTML = ''; // Limpiar opciones de pregunta
        if (botonAnterior) botonAnterior.style.display='none';
        if (botonSiguiente) botonSiguiente.style.display = 'none'; // Ocultar si aún está visible
        botonFinalizar.style.display = 'none'; // Deshabilitar el botón Finalizar para evitar clics múltiples



        console.log('URL para fetch:', procesarUrl); // Verifica que esta sea la URL correcta
        console.log('Enviando JSON con método POST:', datosJSON);
    
    
        // 5. Enviar los datos JSON al servidor Flask usando fetch
        fetch(procesarUrl, { // <--- ¡AQUÍ ESTÁ EL CAMBIO!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: datosJSON
        })
        .then(response => {
            if (!response.ok) {
                // Si la respuesta del servidor no es OK (ej. error 500, 400), lanzar un error
                return response.json().then(errData => { // Intenta obtener más info del error si es JSON
                    throw new Error(errData.message || `Error del servidor: ${response.status}`);
                });
            }
            return response.json(); // Esperar una respuesta JSON del servidor
        })
        .then(data => {
            // El servidor debería responder con algo como { status: 'success', redirect_url: '...' }
            console.log('Respuesta del servidor:', data);
            if (data && data.redirect_url) {
                // Redirigir a la página de resultados que el servidor indicó
                window.location.href = data.redirect_url;
            } else {
                // Si el servidor no proporcionó una URL de redirección o hubo otro problema
                if (preguntaTitulo) preguntaTitulo.textContent = 'Error';
                if (formulario) formulario.innerHTML = '<p>Hubo un problema al procesar tus respuestas. El servidor no indicó una página de resultados.</p>';
                // Considera rehabilitar el botón o dar opción de reintentar si es apropiado
                botonFinalizar.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error al enviar/procesar las respuestas:', error);
            if (preguntaTitulo) preguntaTitulo.textContent = 'Error de Comunicación';
            if (formulario) formulario.innerHTML = `<p>No se pudieron enviar tus respuestas: ${error.message}. Por favor, revisa tu conexión e inténtalo de nuevo.</p>`;
            // Rehabilitar el botón para que el usuario pueda reintentar
            botonFinalizar.style.display = 'inline-block'; // O 'block' según tu CSS
            if (botonAnterior) botonAnterior.disabled = false; // O restaurar el estado de los botones
        });
    });
}


    // --- INICIALIZACIÓN ---
    // mostrarPregunta() se encargará de llamar a actualizarBarraProgreso()
    // y establecer el texto inicial correctamente.
    if (preguntas.length > 0) {
        mostrarPregunta();
    } else {
        preguntaTitulo.textContent = 'No hay preguntas en la encuesta.';
        if (totalPreguntasSpan) totalPreguntasSpan.textContent = 'Pregunta 0 de 0';
        if (progresoBarra) progresoBarra.style.width = '0%';
        if (botonSiguiente) botonSiguiente.disabled = true;
        if (botonAnterior) botonAnterior.disabled = true;
        if (botonFinalizar) botonFinalizar.style.display = 'none';
    }
});