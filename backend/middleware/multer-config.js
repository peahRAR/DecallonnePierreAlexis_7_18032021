const multer = require('multer');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
}

//Indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, 'images');
    },
    filename: (req,file,callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.minetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');