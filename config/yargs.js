const descripcion = {
    descripcion: {
        demand: true,
        alias: 'd',
        describe: 'Texto que describe la tarea'
    }
};
const completado = {
    completado: {
        alias: 'c',
        alias: 'completada',
        default: true,
        describe: 'Indica si se completó o no.'
    }
};
const tareasPorMostrar = {
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
};
//Require de yargs.
const argv = require('yargs')
    .command('crear', 'Crear una tarea pendiente', descripcion)
    .command('actualizar', 'Actualiza el estado de una tarea',
        /*
         * El curso dice que lo siguiente es válido sin mi validación extra de alias, pero no me funciona:
         */
        {
            descripcion, // debería tomar la definición de arriba
            completado // debería tomar la definición de arriba
            /*
             * En el app estoy teniendo que tomar los alias si no se toma el nombre completo
             * (d para descripción y c/completada para completado), pareciera que no los ve...
             */
        }
        /*
        {

            descripcion: {
                demand: true,
                alias: 'd',
                describe: 'Texto que describe la tarea'
            },
            completado: {
                alias: 'c',
                default: true,
                describe: 'Indica si se completó o no.'
            }
    }*/
    )
    .command('listar', 'Mostrar todas las tareas pendientes', tareasPorMostrar)
    .command('borrar', 'Borra una tarea de la base de datos', descripcion)
    .command('destruir-completamente-toda-la-base-de-datos', 'Destruye completamente toda la base de datos')
    .help()
    .argv;

// Lo agregamos al módulo para accederlo desde fuera:
module.exports = {
    argv
};

// Otra forma de hacerlo:
// module.exports.argv = argv;