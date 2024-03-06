const express=require('express')
const routes=express.Router()
const loginController=require('../controller/login/loginController')

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The Name of the Login
 *         password:
 *           type: string
 *           description: The Login password name
 *       example:
 *         email: a@gmail.com
 *         password: add password
 */


/**
 * @swagger
 * /api/login/info:
 *   get:
 *     summary: Returns the list of all the Login
 *     tags: [Login]
 *     parameters:
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The Login id
 *     responses:
 *       200:
 *         description: The list of the Login
 */

routes.get('/info',loginController.logInInfo)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Create a new Login
 *     tags: [Login]
 *     parameters:
 *      - in: query
 *        name: email
 *        schema:
 *         type: string
 *        required: true
 *        description: The User email
 *      - in: query
 *        name: password
 *        schema:
 *         type: string
 *        required: true
 *        description: The User password
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */
routes.post('/',loginController.logIn)

// /**
//  * @swagger
//  * /api/login/signInfo:
//  *   get:
//  *     summary: Returns the list of all the signup
//  *     tags: [Login]
//  *     responses:
//  *       200:
//  *         description: The list of the Login
//  */
// routes.get('/signInfo',loginController.singUpInfo)
// /**
//  * @swagger
//  * /api/login/signup:
//  *   post:
//  *     summary: Create a new signup
//  *     tags: [Login]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Login'
//  *     responses:
//  *       200:
//  *         description: The User was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Login'
//  *       500:
//  *         description: Some server error
//  */
// routes.post('/signup',loginController.signUp)

//routes.post('/test',loginController.test)
module.exports=routes

