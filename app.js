const argv = require('./config/yargs').argv;

//console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        console.log("Crear pendiente");
        break;
    case 'listar':
        console.log("Mostrar todas las tareas pendientes");
        break;
    case 'actualizar':
        console.log('Actualiza una tarea pendiente');
        break;
    default:
        console.log('Comando no reconocido');
        break;
}