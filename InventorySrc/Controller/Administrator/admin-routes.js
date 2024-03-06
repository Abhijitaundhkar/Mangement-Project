const express=require('express')
const adminController=require("./adminController")
const adminValidation=require('./admin-validator')
const router=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     admin:
 *       type: object
 *       required:
 *         - adminFirstName
 *         - adminLastName
 *         - adminPhoneNumber
 *         - adminEmailId
 *         - adminPassword
 *       properties:
 *         adminFirstName:
 *           type: string
 *           description: The Name of the User
 *         adminLastName:
 *           type: string
 *           description: The User last name
 *         adminPhoneNumber:
 *           type: string
 *           description: The user phone no
 *       example:
 *         adminFirstName: Abhijit
 *         adminLastName: Aundhkar
 *         adminPhoneNumber: "11111111"
 *         adminEmailId: a@gmail.com
 *         adminPassword: "0000000"
 */


/**
 * @swagger
 * /api/admin/info:
 *   get:
 *     summary: Returns the list of all the Login
 *     tags: [admin]
 *     responses:
 *       200:
 *         description: The list of the Login
 */

router.get('/info',adminController.getUser)

/**
 * @swagger
 * /api/admin/add:
 *   post:
 *     summary: Create a new User
 *     tags: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/admin'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/admin'
 *       500:
 *         description: Some server error
 */
router.post('/add',adminValidation,adminController.addUser)
module.exports=router