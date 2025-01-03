// Función para generar un número aleatorio entre min y max
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        document.addEventListener('DOMContentLoaded', function () {
            const url = 'https://docs.google.com/spreadsheets/d/1bA9COKwgJdbCpucQzcV64k2xiATwGSDcT5z3NPGE08M/pub?output=csv';

            document.getElementById('searchButton').addEventListener('click', function () {
                const specificId = document.getElementById('idInput').value.trim();
                const password = document.getElementById('passwordInput').value.trim();

                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        const allRows = data.split(/\r?\n|\r/);
                        const resultContainer = document.getElementById('resultContainer');
                        const loginInputs = document.querySelectorAll('.container input, .container button');
                        const logoImage = document.getElementById('logoImage');

                        resultContainer.innerHTML = '';

                        const headers = allRows[0].split(',');

                        let dataFound = false;

                        if (specificId === 'Kli' && password === 'ZQQ203') {
                            // Generar leaderboard basado en Exp
                            let grupoClase = prompt('¿Qué grupo quieres revisar?(l/m)'); // Obtener el grupo a revisar

                            const leaderboardData = allRows.slice(1).map(row => {
                                const cells = row.split(',');
                                return {
                                    name: cells[1], // Nombre del alumno (asumiendo que está en la columna 1)
                                    exp: parseFloat(cells[5]), // Experiencia del alumno (asumiendo que está en la columna 5)
                                    type: cells[7], // Tipo de alumno (asumiendo que está en la columna 7)
                                    id: cells[0]
                                };
                            }).filter(alumno => {
                                return alumno.type.trim().toLowerCase() === grupoClase.trim().toLowerCase();
                            }); // Filtrar según el grupo ingresado


                            // Verificar si el filtro devolvió algún dato
                            if (leaderboardData.length === 0) {
                                alert('No se encontraron alumnos para el grupo especificado.');
                            }

                            // Ordenar los alumnos por experiencia (Exp)
                            leaderboardData.sort((a, b) => b.exp - a.exp);

                            // Crear tabla de leaderboard
                            let leaderboardHTML = "<table><tr><th>Id</th><th>Nombre</th><th>Exp</th></tr>";
                            leaderboardData.forEach(alumno => {
                                leaderboardHTML += `<tr><td>${alumno.id}</td><td>${alumno.name}</td><td>${alumno.exp}</td></tr>`;
                            });
                            leaderboardHTML += "</table>";

                            resultContainer.innerHTML = leaderboardHTML;
                            dataFound = true;
                        } else if (specificId === 'Kli' && password === 'zqq203') {
                            // Solicitar ID específico
                            const inputId = prompt('Ingrese el ID específico que desea ver:');
                            if (inputId) {
                                // Aquí defines las columnas que deseas visualizar
                                // Por ejemplo, si quieres mostrar solo las columnas 0, 2 y 4:
                                const columnsToShow = [0, 1, 2, 3, 4, 5,8];

                                allRows.slice(1).forEach(row => {
                                    if (row) {
                                        const cells = row.split(',');
                                        if (cells[0].trim() === inputId.trim()) {
                                            headers.forEach((header, index) => {
                                                if (columnsToShow.includes(index)) {  // Verifica si la columna está en la lista de columnas a mostrar
                                                    const div = document.createElement('div');
                                                    div.className = 'grid-item';

                                                    const label = document.createElement('label');
                                                    label.textContent = header + ':';
                                                    const value = document.createElement('span');
                                                    value.textContent = ' ' + cells[index];

                                                    div.appendChild(label);
                                                    div.appendChild(value);
                                                    resultContainer.appendChild(div);
                                                }
                                            });

                                            dataFound = true;
                                        }
                                    }
                                });
                            }
                        } else {
                            // Verificación normal para otros usuarios
                            const columnsToShow = [1, 3, 4, 5];
                            allRows.slice(1).forEach(row => {
                                if (row) {
                                    const cells = row.split(',');
                                    if (cells[0].trim() === specificId && cells[2].trim() === password) {
                                        // Crear contenedor principal
                                        const mainContainer = document.createElement('div');
                                        mainContainer.className = 'main-container';

                                        // Mostrar el nivel del alumno
                                        const levelDiv = document.createElement('div');
                                        levelDiv.className = 'level';
                                        const progressValue = parseFloat(cells[5].trim());
                                        let max = 100;  // Valor máximo por defecto
                                        let min = 0;    // Valor mínimo por defecto
                                        let a = 0;
                                        let b = 0;
                                        let c = 0;

                                        if (!isNaN(progressValue)) {
                                            if (progressValue < 15) {
                                                a = 15;
                                                b = 0;
                                            } else if (progressValue < 25) {
                                                a = 25;
                                                b = 16;
                                                c = 1;
                                            } else if (progressValue < 40) {
                                                a = 40;
                                                b = 26;
                                                c = 2;
                                            } else if (progressValue < 65) {
                                                a = 65;
                                                b = 41;
                                                c = 3;
                                            } else if (progressValue < 90) {
                                                a = 90;
                                                b = 66;
                                                c = 4;
                                            } else if (progressValue < 125) {
                                                a = 125;
                                                b = 91;
                                                c = 5;
                                            }else if (progressValue > 125) {
                                                a = progressValue;
                                                b = 124
                                                c = 'God';
                                            }
                                            levelDiv.textContent = `Nivel: ${c}`;
                                        } else {
                                            levelDiv.textContent = 'Nivel: 0';
                                        }
                                        mainContainer.appendChild(levelDiv);

                                        // Crear contenedor para nombre, tareas y puntos
                                        const infoContainer = document.createElement('div');
                                        infoContainer.className = 'info-container';
                                        infoContainer.style.textAlign = 'center';  // Centrar el texto

                                        // Mostrar el nombre
                                        const nameDiv = document.createElement('div');
                                        nameDiv.className = 'name';
                                        nameDiv.textContent = `${cells[1]}`;
                                        nameDiv.style.marginBottom = '10px';  // Espacio abajo

                                        // Mostrar tareas entregadas
                                        const tasksDiv = document.createElement('div');
                                        tasksDiv.className = 'tasks';
                                        tasksDiv.textContent = `Tareas: ${cells[3]}`;
                                        tasksDiv.style.marginBottom = '10px';  // Espacio abajo

                                        // Mostrar puntos
                                        const pointsDiv = document.createElement('div');
                                        pointsDiv.className = 'points';
                                        pointsDiv.textContent = `Puntos: ${cells[4]}`;

                                        // Mostrar Examen teórico
                                        const exTeo = document.createElement('div');
                                        exTeo.className = 'Examen Teórico';
                                        exTeo.textContent = `Examen teórico (50%): ${cells[11]}`;

                                        // Mostrar Examen Práctico
                                        const exPra = document.createElement('div');
                                        exPra.className = 'Examen Teórico';
                                        exPra.textContent = `Examen práctico (50%): ${cells[12]}`;

                                        // Mostrar Calificación Primer Parcial
                                        const primPar = document.createElement('div');
                                        primPar.className = 'Calificación';
                                        primPar.textContent = `Calificación: ${cells[13]}`;

                                        // Agregar nombre, tareas y puntos al contenedor
                                        infoContainer.appendChild(nameDiv);
                                        infoContainer.appendChild(tasksDiv);
                                        infoContainer.appendChild(pointsDiv);
                                        infoContainer.appendChild(exTeo);
                                        infoContainer.appendChild(exPra);
                                        infoContainer.appendChild(primPar);

                                        // Agregar el contenedor al contenedor principal
                                        mainContainer.appendChild(infoContainer);

                                        // Crear contenedor para la barra de progreso
                                        const progressContainer = document.createElement('div');
                                        progressContainer.className = 'progress-container';
                                        progressContainer.style.marginTop = '10px';  // Espacio arriba

                                        const progressBar = document.createElement('div');
                                        progressBar.className = 'progress-bar';
                                        if (!isNaN(progressValue)) {
                                            progressBar.style.width = `${((progressValue - b) / (a - b) * 100)}%`;
                                        } else {
                                            progressBar.style.width = '0';
                                        }

                                        // Agregar texto dentro de la barra de progreso
                                        const progressText = document.createElement('div');
                                        progressText.className = 'progress-text';
                                        progressText.textContent = `Exp: ${progressValue}/${a}`;
                                        progressContainer.appendChild(progressBar);
                                        progressContainer.appendChild(progressText);

                                        // Agregar la barra de progreso al contenedor principal
                                        mainContainer.appendChild(progressContainer);

                                        // Crear caja de texto dinámica con información de la columna 8
                                        const infoBox = document.createElement('div');
                                        infoBox.className = 'info-box';
                                        infoBox.textContent = cells[8].trim();  // Información de la columna 8
                                        const infoBox1 = document.createElement('p');
                                        infoBox1.style.marginTop = '40px';
                                        infoBox1.textContent = 'Comentarios';
                                        mainContainer.appendChild(infoBox1);
                                        mainContainer.appendChild(infoBox);

                                        // Crear botón de asesoría al final
                                        const consultButton = document.createElement('a');
                                        consultButton.className = 'consult-button';
                                        consultButton.href = 'https://meetings.hubspot.com/francisco-cal-y-mayor?uuid=d9ac1547-6fad-4115-8c49-caa73ba1c855';
                                        consultButton.target = '_blank'; // Abrir en una nueva pestaña
                                        consultButton.textContent = 'PIDE UNA ASESORÍA';
                                        consultButton.style.display = 'inline-block'; // Hacer que el enlace sea un bloque
                                        consultButton.style.marginTop = '25px'; // Espacio superior
                                        consultButton.style.backgroundColor = '#b225f6'; // Color MORADO
                                        consultButton.style.color = '#fff'; // Color del texto
                                        consultButton.style.padding = '10px';
                                        consultButton.style.textAlign = 'center';
                                        consultButton.style.textDecoration = 'none';
                                        consultButton.style.borderRadius = '44px';
                                        //consultButton.style.border = '1px solid #757575'; // Borde gris

                                        // Estilo para el estado hover del botón
                                        consultButton.style.transition = 'background-color 0.3s'; // Transición suave
                                        consultButton.addEventListener('mouseover', () => {
                                            consultButton.style.backgroundColor = '#db0d3a'; // Color MORADO obscuro
                                        });
                                        consultButton.addEventListener('mouseout', () => {
                                            consultButton.style.backgroundColor = '#b225f6'; // Color gris original
                                        });

                                        // Agregar el botón al contenedor principal
                                        mainContainer.appendChild(consultButton);

                                        // Agregar el contenedor principal al contenedor de resultados
                                        resultContainer.appendChild(mainContainer);

                                        dataFound = true;

                                        // Cambiar el logo basado en la columna 6
                                        if (cells.length > 6) {
                                            logoImage.src = cells[6];
                                        }
                                    }
                                }
                            });
                        }

                        if (!dataFound) {
                            const div = document.createElement('div');
                            div.className = 'grid-item';
                            div.textContent = 'No se encontraron datos para el ID proporcionado.';
                            resultContainer.appendChild(div);
                        }

                        if (dataFound) {
                            resultContainer.style.display = 'block';
                            loginInputs.forEach(input => input.style.display = 'none');

                            const closeIcon = document.createElement('div');
                            closeIcon.className = 'close-icon';
                            closeIcon.textContent = '×';
                            closeIcon.onclick = function () {
                                resultContainer.style.display = 'none';
                                loginInputs.forEach(input => {
                                    input.style.display = 'block';
                                    input.value = '';
                                });

                                // Regresar a la imagen original del logo
                                logoImage.src = 'https://raw.githubusercontent.com/fcalUP/fcalUP.github.io/main/LOGO.png';
                            };
                            resultContainer.appendChild(closeIcon);
                        }
                    })
                    .catch(error => console.error('Error fetching the Google Sheets data:', error));
            });
        });

        // Funciones para abrir y cerrar la ventana modal
        function openModal() {
            document.getElementById("modal").style.display = "block";
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
        }
