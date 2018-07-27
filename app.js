// Require de la biblioteca de colores (https://www.npmjs.com/package/colors)
const colors = require('colors/safe');

const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];
//console.log(argv);
/*
 * Asignación extra agregada por mí porque si no, el actualizar no funciona: 
 */
let descripcion = argv.descripcion;
if (!descripcion) {
    descripcion = argv.d;
}
/*
 * Fin de asignación extra. 
 */

switch (comando) {

    case 'crear':
        //console.log(argv);
        let tarea = porHacer.crear(descripcion);
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
        //console.log(argv);
        //console.log(argv.descripcion);
        // console.log(argv.completado);
        /*
         * Asignación extra agregada por mí porque si no, el actualizar no funciona: 
         */
        let completado = argv.completado;
        if (!completado) {
            completado = argv.c;
        }
        if (!completado) {
            completado = argv.completada;
        }
        /*
         * Fin de asignación extra
         */
        let actualizado = porHacer.actualizar(descripcion, completado);
        let estadoFinal = (porHacer.obtenerEstadoActividad(completado) ? colors.green('Completada') : colors.red('Pendiente'));
        //console.log(estadoFinal);
        if (actualizado)
            console.log(`Tarea ${descripcion} actualizada como ${estadoFinal}.`);
        else
            console.log("La tarea no pudo ser actualizada. Intente de nuevo, por favor.")
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado) {
            console.log(colors.red(`Tarea ${argv.descripcion} borrada.`));
        } else {
            console.log(colors.yellow("No se encontró la tarea " + argv.descripcion + ". No se hicieron cambios a la base de datos."));
        }
        break;
    case 'destruir-completamente-toda-la-base-de-datos':
        let destruccionTotal = porHacer.destruirCompletamenteBaseDeDatos();
        if (destruccionTotal) {
            console.log(colors.red("R.I.P. Base de Datos. Espero que la hayas respaldado."));
        } else {
            console.log(colors.green("¡Milagro! ¡La base de datos se salvó inexplicablemente!"));
        }
        break;
    default:
        console.log('Comando no reconocido');
        break;
}