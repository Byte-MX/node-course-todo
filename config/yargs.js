const descOpt = {
    descripcion: {
        demand: true,
        alias: 'd',
        describe: 'Texto que describe la tarea'
    }
};
//Require de yargs.
const argv = require('yargs')
    .command('crear', 'Crear una tarea pendiente', descOpt)
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion: descOpt.descripcion,
        completado: {
            alias: 'c',
            default: true,
            describe: 'Indica si se completó o no.'
        }
    })
    .command('listar', 'Mostrar todas las tareas pendientes', {
        pendientes: {
            alias: 'p',
            describe: 'Muestra las tareas pendientes (por defecto).'
        },
        completadas: {
            alias: 'c',
            describe: 'Muestra las tareas completadas en vez de las pendientes.'
        },
        todas: {
            alias: 't',
            describe: 'Muestra todas las tareas (completadas y pendientes).'
        }
    })
    .help()
    .argv;

// Lo agregamos al módulo para accederlo desde fuera:
module.exports = {
    argv
};

// Otra forma de hacerlo:
// module.exports.argv = argv;