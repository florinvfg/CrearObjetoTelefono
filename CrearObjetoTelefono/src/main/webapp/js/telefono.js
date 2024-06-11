class TelefonoMovil {
    constructor(Name, CPU, RAM, Almacenamiento, Ancho, Alto, numCamaras) {
        this.Name = Name;
        this.CPU = CPU;
        this.RAM = RAM;
        this.Almacenamiento = Almacenamiento;
        this.Ancho = Ancho;
        this.Alto = Alto;
        this.numCamaras = numCamaras;
    }

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

function cargarDatosJSON(url, callback) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
            try {
                const miObjeto = JSON.parse(this.responseText);
                callback(miObjeto);
            } catch (error) {
                console.error("Error al parsear el JSON:", error);
            }
        } else {
            console.error("Error en la solicitud:", xmlhttp.statusText);
        }
    };
    xmlhttp.onerror = function() {
        console.error("Error en la conexión");
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosJSON('files/telefono.json', function(data) {
        if (data) {
            const infoTelefonosDiv = document.getElementById('info-telefono');
            data.telefonos.forEach(telefonoData => {
                let telefono = new TelefonoMovil(
                    telefonoData.Name,
                    telefonoData.CPU,
                    telefonoData.RAM,
                    telefonoData.Almacenamiento,
                    telefonoData.Ancho,
                    telefonoData.Alto,
                    telefonoData.numCamaras
                );
                const telefonoDiv = document.createElement('div');
                telefonoDiv.className = 'telefono';
                telefonoDiv.innerHTML = telefono.toString().replace(/\n/g, '<br>');
                infoTelefonosDiv.appendChild(telefonoDiv);
            });
        }
    });
});
