const multer = require('multer');

const allowedMimeType = ['image/jpg','image/jpeg','image/png','image/gif']

//Indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        callback(null, Date.now() + '_' + name);
    }
});

//Verificaiton du fichier envoyé
module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (!allowedMimeType.includes(file.mimetype)) {
            req.fileValidationError = 'goes wrong on the minetype';
            return callback(null, false, new Error('goes wrong on the minetype'));
        }
        console.log(file);
        callback(null, true);
    }
}).single('attachement');