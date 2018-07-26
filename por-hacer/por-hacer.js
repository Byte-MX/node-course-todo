// Require del FileSystem (https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_file_system)
const fs = require('fs');


let listadoPendientes = [];

const crear = (descripcion) => {
    let pendiente = {
        descripcion,
        completado: false
    };

    listadoPendientes.push(pendiente);
    return pendiente;
};

module.exports = {
    crear
};