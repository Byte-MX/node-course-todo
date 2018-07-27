// Require del FileSystem (https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_file_system)
const fs = require('fs');
// Require de la biblioteca de colores (https://www.npmjs.com/package/colors)
const colors = require('colors/safe');

let listadoPendientes = [];

const guardarDB = () => {
    return new Promise((reject, resolve) => {
        let data = JSON.stringify(listadoPendientes);
        fs.writeFile('db/data.json', data, (err) => {
            if (err) throw new Error('La lista de actividades no se pudo guardar', err); //reject(err); 
            else
                resolve('Cambio guardado en base de datos.');
        });
    });
};

const cargarDB = () => {
    try {
        listadoPendientes = require('../db/data.json');
    } catch (error) {
        listadoPendientes = [];
    }

    //console.log(listadoPendientes);
};

const obtenerEstadoActividad = (completado = true) => {
    let compleString = '' + completado;
    return !(compleString.toUpperCase() == 'FALSE' || compleString.toUpperCase() == 'NO' || compleString.toUpperCase() == 'PENDIENTE' || compleString.toUpperCase() == 'POR HACER' || compleString.toUpperCase() == 'TODO' || compleString.toUpperCase() == '2DO');
}

const crear = (descripcion) => {
    cargarDB();

    let pendiente = {
        descripcion,
        completado: false
    };

    listadoPendientes.push(pendiente);
    guardarDB()
        //.then(archivo => console.log(`Actividad: ${pendiente} guardada en archivo: `, colors.green(archivo)))
        .catch(e => console.log(e));
    return pendiente;
};

const getListado = (cuales) => {
    //Llega un arreglo con [pendientes, completadas, todas]
    let tipo = 'Pendientes'; // Por omisión, solo pendientes.

    if (cuales[2] || (cuales[0] && cuales[1])) // =  if (todas || (pendientes && completadas))
    {
        tipo = 'Todas';
    } else if (cuales[1] && !cuales[0]) // = else if (completadas && !pendientes)
    {
        tipo = 'Completadas';
    }
    //console.log(`Por mostrar: ${tipo}`);
    cargarDB();
    let listadoAMostrar = [];
    switch (tipo) {
        case 'Todas':
            return listadoPendientes; // break no necesario por return
        case 'Completadas':
            for (let tarea of listadoPendientes) {
                if (tarea.completado) {
                    listadoAMostrar.push(tarea);
                }
            }
            break;
        default:
            for (let tarea of listadoPendientes) {
                if (!tarea.completado) {
                    listadoAMostrar.push(tarea);
                }
            }
            break;
    }
    return listadoAMostrar;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    console.log(descripcion);
    console.log(completado);
    let index = listadoPendientes.findIndex(tarea => tarea.descripcion === descripcion);

    let estado = obtenerEstadoActividad(completado);
    //-1 es que no lo encontró.
    if (index >= 0) {
        listadoPendientes[index].completado = estado;
        guardarDB()
            .catch(err => console.log(err));
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //console.log(descripcion);
    let longitudOriginal = listadoPendientes.length;
    listadoPendientes = listadoPendientes.filter(tarea => tarea.descripcion != descripcion);
    let longitudPostBorrado = listadoPendientes.length;
    if (longitudOriginal == longitudPostBorrado) // Si coinciden, no se borró nada.
    {
        return false;
    } else {
        guardarDB()
            .catch(err => console.log(err));
        return true;
    }
}

const destruirCompletamenteBaseDeDatos = () => {
    cargarDB();
    listadoPendientes = [];
    guardarDB()
        .catch(err => console.log(err));
    console.log("Kaput");
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    obtenerEstadoActividad,
    borrar,
    destruirCompletamenteBaseDeDatos
};