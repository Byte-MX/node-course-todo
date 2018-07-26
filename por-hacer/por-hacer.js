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
                resolve('Actividad guardada en base de datos.');
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

const getListado = (cuales) => {
    cargarDB();
    let listadoAMostrar = [];
    switch (cuales) {
        case 'Todas':
            for (let tarea of listadoPendientes) {
                listadoAMostrar.push(tarea);
            }
            break;
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

module.exports = {
    crear,
    getListado
};