const express=require('express')
const mobileController=require("./mobileController")
const mobileValidation=require('./mobile-validator')
const upload=require('./upload')
const router=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     mobile:
 *       type: object
 *       required:
 *         - userFirstName
 *         - userLastName
 *         - userPhoneNumber
 *         - userEmailId
 *         - userPassword
 *       properties:
 *         userFirstName:
 *           type: string
 *           description: The Name of the User
 *         userLastName:
 *           type: string
 *           description: The User last name
 *         userPhoneNumber:
 *           type: string
 *           description: The user phone no
 *       example:
 *         userFirstName: viraj
 *         userLastName: Aundhkar
 *         userPhoneNumber: "9345678321"
 *         userEmailId: a@gmail.com
 *         userPassword: "9345678321"
 */


/**
 * @swagger
 * /api/mobile/info:
 *   get:
 *     summary: Returns the list of all the Login
 *     tags: [mobile]
 *     responses:
 *       200:
 *         description: The list of the Login
 */

router.get('/info',mobileController.getUser)

/**
 * @swagger
 * /api/mobile/add:
 *   post:
 *     summary: Create a new User
 *     tags: [mobile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/mobile'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/mobile'
 *       500:
 *         description: Some server error
 */
router.post('/add',upload,mobileValidation, mobileController.addMobile)
router.put('/updateInfo',upload,mobileValidation, mobileController.updateMobileInfo)
router.delete('/remove', mobileController.deleteMobile)
router.get('/getDetailsByID', mobileController.getDetailsByID)
router.get('/search', mobileController.searchMobile)
module.exports=router