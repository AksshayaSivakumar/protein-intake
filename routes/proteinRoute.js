const express=require('express');
const Controller=require('../controllers/entries');


const router=express.Router();


router.get('/',Controller.layout);
router.post('/add', Controller.addentry);
router.get('/entries',Controller.getentry);
router.delete('/delete/:id',Controller.deleteentry);




module.exports=router;