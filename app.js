// Require de la biblioteca de colores (https://www.npmjs.com/package/colors)
const colors = require('colors/safe');

const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];
//console.log(argv);

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let cuales = 'Pendientes'; //default
        let pendientes = argv.pendientes;
        //console.log("Pendientes: " + pendientes);
        let completadas = argv.completadas;
        //console.log('Completadas: ' + completadas);
        let todas = argv.todas;
        //console.log(`Todas: ${todas}`);
        if (todas || (pendientes && completadas)) {
            cuales = 'Todas';
        } else if (completadas && !pendientes) {
            cuales = 'Completadas';
        }
        //console.log(`Por mostrar: ${cuales}`);
        let listado = porHacer.getListado(cuales);
        console.log(colors.cyan("\n========== Lista de tareas ==========\n"));
        if (listado.length == 0) {
            console.log(colors.cyan("No hay tareas pendientes."));
        } else {
            for (let tarea of listado) {
                let completado = colors.red('Pendiente');
                if (tarea.completado) {
                    completado = colors.green('Completada');
                }
                console.log(` - ${tarea.descripcion}: \t` + completado);
            }
        }
        console.log(colors.cyan("\n=====================================\n"));
        break;
    case 'actualizar':
        console.log('Actualiza una tarea pendiente');
        break;
    default:
        console.log('Comando no reconocido');
        break;
}