const express=require('express')
const userController=require("./userController")
const userValidation=require('./user-validator')
const router=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     user:
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
 * /api/user/info:
 *   get:
 *     summary: Returns the list of all the Login
 *     tags: [user]
 *     responses:
 *       200:
 *         description: The list of the Login
 */

router.get('/info',userController.getUser)

/**
 * @swagger
 * /api/user/add:
 *   post:
 *     summary: Create a new User
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */
router.post('/add',userValidation,userController.addUser)

module.exports=router