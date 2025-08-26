document.addEventListener('DOMContentLoaded', () => {
    // --- ESTRUCTURA DE DATOS LOCAL PARA INFORMACIÓN DE CARRERAS ---
    const CARRERAS_INFO = {
        "sistemas": {
            nombre: "Ingeniería de Sistemas",
            descripcionArea: "Te enfocas en el diseño, desarrollo y mantenimiento de sistemas de software y soluciones tecnológicas innovadoras, aplicando principios de la computación para resolver problemas complejos.",
            perfilOcupacional: [
                "Gerencia o dirección de sistemas de información.",
                "Liderazgo en desarrollo de software y aplicaciones.",
                "Gestión de proyectos tecnológicos.",
                "Consultoría especializada en ingeniería de software, ciberseguridad, redes y comunicaciones.",
                "Investigación y desarrollo de nuevas tecnologías.",
                "Asesoría estratégica en el sector informático para la optimización de productos y procesos."
            ]
        },
        "mecatronica": {
            nombre: "Ingeniería Mecatrónica",
            descripcionArea: "Combina la mecánica, electrónica, informática y control para diseñar, desarrollar y optimizar productos y procesos automatizados y sistemas inteligentes.",
            perfilOcupacional: [
                "Ingeniero de diseño de sistemas, procesos y productos asistidos por tecnología de vanguardia.",
                "Profesional capaz de manejar, diseñar y administrar herramientas digitales para la automatización de procesos y control distribuido.",
                "Profesional capaz de realizar mantenimiento y optimización de procesos de manufactura.",
                "Consultoría en el desarrollo de proyectos en el contexto de la industria 4.0.",
                "Innovación en el desarrollo de productos inteligentes.",
                "Ingeniero líder de proyectos, capacitado en el uso de tecnologías, como robótica industrial, inteligencia artificial y aprendizaje automático (machine learning) con disposición para trabajar en equipos multidisciplinarios."
            ]
        },
        "quimica": {
            nombre: "Ingeniería Química",
            descripcionArea: "Aplicas principios de la química, física, biología y matemáticas para diseñar, operar y optimizar procesos industriales que transforman materias primas en productos valiosos de forma segura y sostenible.",
            perfilOcupacional: [
                "gerencia, dirección y planeación soportado en el diseño, análisis, control e identificación de riesgos en procesos químicos",
                "Empresas encargadas de la Gestión y Gerencia de proyectos de ingeniería y biocomercio.",
                "Creación e Innovación de empresas en el sector químico y biotecnológico",
                "Empresas de consultoría en soluciones en ingeniería a través del diseño, la simulación e intensificación de productos y procesos",
                "Consultoría técnica en ingeniería de procesos.",
                "Industria química, bioquímica y biotecnológica"
            ]
        },
        "lenguas": {
            nombre: "Lenguas Modernas",
            descripcionArea: "Su estudio se centra en la comprensión profunda y el dominio de lenguas extranjeras, así como el análisis de sus contextos culturales, literarios, históricos y sociales, facilitando la comunicación intercultural efectiva.",
            perfilOcupacional: [
                "Creador de contenidos multilingües en las organizaciones.",
                "Asesor multilingüe de discursos organizacionales.",
                "Corrector de estilo multilingüe, con especialidad en el ámbito organizacional.",
                "Negociador multilingüe intercultural.",
                "Editor, adaptador, localizador y curador de contenidos multilingües en el ámbito organizacional.",
                "Copywriter multilingüe con especialidad en organizaciones."
            ]
        },
        "mercadeo": {
            nombre: "Mercadeo y Estrategia Comercial",
            descripcionArea: "Desarrollas, implementas y evalúas estrategias innovadoras para promover y comercializar productos o servicios, analizando el mercado, el comportamiento del consumidor y las tendencias globales.",
            perfilOcupacional: [
                "Marketing organizacional.",
                "Servicio al cliente, publicidad y relaciones corporativas.",
                "Gerencia comercial.",
                "Desarrollo e investigación de productos y canales",
                "Dirección de marcas.",
                "Gerencia de medios."
            ]
        }
        // Añade aquí más carreras con su ID, nombre, descripción y perfil
    };

    // --- REFERENCIAS A ELEMENTOS DEL DOM (como las tenías) ---
    const resultsBoxContainer = document.querySelector('.results-box');
    const mainAreaContainer = document.querySelector('.main-area');
    const secondaryAreaContainer = document.querySelector('.secondary-area');

    /**
     * Función para solicitar los resultados (solo afinidades e IDs principales) al servidor Flask.
     */
    async function fetchResultadosVocacionales() {
        const apiUrl = '/api/mis_resultados_vocacionales_calculados'; // Endpoint que devuelve solo IDs y porcentajes

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            const data = await response.json(); // Espera una estructura como:
                                                // { afinidadesCalculadas: [{id: "sistemas", porcentaje: 60}, ...],
                                                //   idAreaPrincipal: "sistemas",
                                                //   idAreaSecundaria: "mecatronica" }
            console.log("Datos de afinidad recibidos del servidor:", data);
            return data;
        } catch (error) {
            console.error("Error al obtener los resultados vocacionales:", error);
            if (resultsBoxContainer) {
                resultsBoxContainer.innerHTML = `<p class="error-message">No se pudieron cargar tus resultados. Inténtalo más tarde.</p>`;
            }
            if(mainAreaContainer) mainAreaContainer.style.display = 'none';
            if(secondaryAreaContainer) secondaryAreaContainer.style.display = 'none';
            return null;
        }
    }

    /**
     * Actualiza la sección de porcentajes de afinidad.
     */
    function actualizarPorcentajesAfinidad(afinidadesCalculadas) {
        if (!resultsBoxContainer || !afinidadesCalculadas || afinidadesCalculadas.length === 0) {
            console.warn("No hay datos de afinidad o contenedor no encontrado.");
             if (resultsBoxContainer) resultsBoxContainer.innerHTML = '<p>No hay datos de afinidad para mostrar.</p>';
            return;
        }

        const profileTitleHTML = resultsBoxContainer.querySelector('.profile-title')?.outerHTML || '<h2>Tu Perfil Vocacional</h2>';
        const profileSubtitleHTML = resultsBoxContainer.querySelector('.profile-subtitle')?.outerHTML || '<p class="profile-subtitle">Estos son los resultados de tu encuesta, ordenados por afinidad.</p>';
        resultsBoxContainer.innerHTML = profileTitleHTML + profileSubtitleHTML; // Reset con títulos

        afinidadesCalculadas.forEach(afinidadServidor => {
            const infoCarreraLocal = CARRERAS_INFO[afinidadServidor.id]; // Busca info local por ID
            if (!infoCarreraLocal) {
                console.warn(`No se encontró información local para la carrera con ID: ${afinidadServidor.id}`);
                return; // Saltar esta carrera si no hay info local
            }

            const skillAreaDiv = document.createElement('div');
            skillAreaDiv.className = 'skill-area';
            skillAreaDiv.innerHTML = `
                <div class="skill-name">
                    <span>${infoCarreraLocal.nombre}</span>
                    <span class="skill-percent">${afinidadServidor.porcentaje}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar" style="width: ${afinidadServidor.porcentaje}%"></div>
                </div>
            `;
            resultsBoxContainer.appendChild(skillAreaDiv);
        });
    }

    /**
     * Actualiza una sección de área (principal o secundaria).
     */
    function actualizarSeccionArea(container, idCarrera, tituloSeccion) {
        const infoCarreraLocal = CARRERAS_INFO[idCarrera]; // Busca info local por ID

        if (!container || !infoCarreraLocal) {
            console.warn(`No hay datos para ${tituloSeccion} (ID: ${idCarrera}) o contenedor no encontrado.`);
            if(container) container.style.display = 'none';
            return;
        }
        container.style.display = 'block';

        const areaTitle = container.querySelector('.area-title');
        const areaDescription = container.querySelector('.area-description');
        const careersGrid = container.querySelector('.careers-grid');

        if (areaTitle) areaTitle.textContent = `${tituloSeccion}: ${infoCarreraLocal.nombre}`;
        if (areaDescription) areaDescription.textContent = infoCarreraLocal.descripcionArea;

        if (careersGrid && infoCarreraLocal.perfilOcupacional) {
            careersGrid.innerHTML = ''; // Limpiar perfiles
            infoCarreraLocal.perfilOcupacional.forEach(perfil => {
                const careerItemDiv = document.createElement('div');
                careerItemDiv.className = 'career-item';
                careerItemDiv.innerHTML = `<ul><li>${perfil}</li></ul>`;
                careersGrid.appendChild(careerItemDiv);
            });
        }
    }

    /**
     * Función principal para cargar y mostrar todos los resultados.
     */
    async function cargarYMostrarResultados() {
        const resultadosServidor = await fetchResultadosVocacionales(); // Obtiene {afinidadesCalculadas, idAreaPrincipal, idAreaSecundaria}

        if (resultadosServidor) {
            // 1. Actualizar la lista de afinidades
            // El servidor ya debería enviar 'afinidadesCalculadas' ordenadas por porcentaje
            actualizarPorcentajesAfinidad(resultadosServidor.afinidadesCalculadas);

            // 2. Actualizar Área Principal
            if (resultadosServidor.idAreaPrincipal && CARRERAS_INFO[resultadosServidor.idAreaPrincipal]) {
                actualizarSeccionArea(mainAreaContainer, resultadosServidor.idAreaPrincipal, "Tu Área Principal");
            } else {
                if(mainAreaContainer) mainAreaContainer.style.display = 'none';
                console.warn("ID de Área Principal no válido o no encontrado en CARRERAS_INFO.");
            }

            // 3. Actualizar Área Secundaria
            if (resultadosServidor.idAreaSecundaria && CARRERAS_INFO[resultadosServidor.idAreaSecundaria] && resultadosServidor.idAreaSecundaria !== resultadosServidor.idAreaPrincipal) {
                actualizarSeccionArea(secondaryAreaContainer, resultadosServidor.idAreaSecundaria, "Área Secundaria");
            } else {
                 if(secondaryAreaContainer) secondaryAreaContainer.style.display = 'none';
                 if (resultadosServidor.idAreaSecundaria) {
                     console.warn("ID de Área Secundaria no válido, no encontrado en CARRERAS_INFO, o es igual al área principal.");
                 }
            }
        }
    }

    // Iniciar el proceso al cargar la página
    cargarYMostrarResultados();
});