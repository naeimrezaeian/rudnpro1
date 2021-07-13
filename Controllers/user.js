const { body } = require('express-validator');
exports.validate = function(){
    
body('Name').isLength({ min: 3 }),
body('Birthday').isDate({format: 'YYYY-MM-DD'}),
body('Sex').isBoolean(),
body('Email').isEmail(),
body('Phone').isLength({ min: 3 }),
body('Address').isLength({ min: 3 }),
body('Country').isLength({ min: 3 }),
body('City').isLength({ min: 3 }),
body('FacultyId').isInt(),
body('DepartmentId').isInt(),
body('FieldId').isInt(),
body('TypeStudy').isInt(),
body('FormStudy').isInt(),
body('YearStudy').isInt(),
body('Additional').isLength({ min: 3 }),
body('Photo').isLength({ min: 3 }),
body('Access').isLength({ min: 3 }),
body('Status').isInt()
   
}