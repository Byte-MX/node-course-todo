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
        let cuales = [];
        cuales.push(argv.pendientes);
        cuales.push(argv.completadas);
        cuales.push(argv.todas);
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