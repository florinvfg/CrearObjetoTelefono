// Definición de la clase TelefonoMovil
class TelefonoMovil {
    // Constructor de la clase TelefonoMovil que inicializa las propiedades del teléfono móvil
    constructor(Name, CPU, RAM, Almacenamiento, Ancho, Alto, numCamaras) {
        this.Name = Name; // Nombre del teléfono
        this.CPU = CPU; // CPU del teléfono
        this.RAM = RAM; // RAM del teléfono
        this.Almacenamiento = Almacenamiento; // Almacenamiento del teléfono
        this.Ancho = Ancho; // Ancho del teléfono
        this.Alto = Alto; // Alto del teléfono
        this.numCamaras = numCamaras; // Número de cámaras del teléfono
    }

    // Método toString() que devuelve una representación en formato de cadena del objeto TelefonoMovil
    toString() {
        return `
Nombre: ${this.Name}
CPU: ${this.CPU}
RAM: ${this.RAM}
Almacenamiento: ${this.Almacenamiento}
Ancho: ${this.Ancho}
Alto: ${this.Alto}
Número de Cámaras: ${this.numCamaras}`;
    }

    // Método toJSON() que devuelve un objeto JSON que representa el objeto TelefonoMovil
    toJSON() {
        return {
            Name: this.Name,
            CPU: this.CPU,
            RAM: this.RAM,
            Almacenamiento: this.Almacenamiento,
            Ancho: this.Ancho,
            Alto: this.Alto,
            numCamaras: this.numCamaras
        };
    }
}

// Función para cargar datos JSON desde un archivo usando XMLHttpRequest
function cargarDatosJSON(url, callback) {
    const xmlhttp = new XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest
    xmlhttp.onload = function() { // Asignar una función al evento onload
        if (xmlhttp.status >= 200 && xmlhttp.status < 300) { // Verificar si la solicitud se realizó con éxito
            try {
                const miObjeto = JSON.parse(this.responseText); // Parsear la respuesta JSON
                callback(miObjeto); // Llamar al callback con el objeto JSON parseado
            } catch (error) {
                console.error("Error al parsear el JSON:", error); // Manejar errores de parseo JSON
            }
        } else {
            console.error("Error en la solicitud:", xmlhttp.statusText); // Manejar errores de solicitud HTTP
        }
    };
    xmlhttp.onerror = function() { // Asignar una función al evento on error para manejar errores de conexión
        console.error("Error en la conexión");
    };
    xmlhttp.open("GET", url, true); // Configurar la solicitud GET con la URL proporcionada
    xmlhttp.send(); // Enviar la solicitud
}

// Event listener para ejecutar código cuando el DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosJSON('files/telefono.json', function(data) { // Cargar datos JSON desde el archivo 'telefono.json'
        if (data) { // Verificar si se recibieron datos correctamente
            const infoTelefonosDiv = document.getElementById('info-telefono'); // Obtener el elemento div donde se mostrará la información de los teléfonos móviles
            data.telefonos.forEach(telefonoData => { // Iterar sobre cada objeto de teléfono en los datos recibidos
                let telefono = new TelefonoMovil( // Crear un nuevo objeto TelefonoMovil con los datos del objeto actual
                    telefonoData.Name,
                    telefonoData.CPU,
                    telefonoData.RAM,
                    telefonoData.Almacenamiento,
                    telefonoData.Ancho,
                    telefonoData.Alto,
                    telefonoData.numCamaras
                );
                const telefonoDiv = document.createElement('div'); // Crear un nuevo elemento div para representar visualmente el teléfono móvil
                telefonoDiv.className = 'telefono'; // Asignar la clase 'telefono' al elemento div
                telefonoDiv.innerHTML = telefono.toString().replace(/\n/g, '<br>'); // Establecer el contenido HTML del elemento div con la representación en formato de cadena del teléfono móvil
                infoTelefonosDiv.appendChild(telefonoDiv); // Agregar el elemento div al contenedor de información de teléfonos móviles
            });
        }
    });
});
