const express=require('express')
const UserController=require('../controller/User/userController')
const userValidation=require('../controller/User/userValidation')
const router=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phoneNo
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The Name of the User
 *         lastName:
 *           type: string
 *           description: The User last name
 *         phoneNo:
 *           type: string
 *           description: The user phone no
 *       example:
 *         firstName: Abhijit
 *         lastName: Aundhkar
 *         phoneNo: 11111111
 *         email: a@gmail.com
 *         password: "0000000"
 */


/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Returns the list of all the User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the User
 */
router.get('/all',UserController.getUser)

/**
 * @swagger
 * /api/user/info/{id}:
 *    get:
 *     summary: Returns the User
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *     responses:
 *       200:
 *         description: The list of the User
 */
router.get('/info/:id',UserController.getUserById)

/**
 * @swagger
 * /api/user/add:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/add',userValidation,UserController.addUser)
 
/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *    summary: Update the User by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: The User was updated
 *       404:
 *         description: The User was not found
 */

router.put("/update/:id",userValidation, UserController.updateUser);

/**
 * @swagger
 * /api/user/remove/{id}:
 *   delete:
 *     summary: Remove the User by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User id
 * 
 *     responses:
 *       200:
 *         description: The User was deleted
 *       404:
 *         description: The User was not found
 */

router.delete("/remove/:id", UserController.deleteUser);

/**
 * @swagger
 * /api/user/getDetails:
 *   get:
 *     summary: get a User
 *     tags: [User]
 *     parameters:
 *      - in: query
 *        name: firstName
 *        schema:
 *         type: string
 *        required: true
 *        description: The User firstName
 *      - in: query
 *        name: lastName
 *        schema:
 *         type: string
 *        required: true
 *        description: The User lastName
 *     responses:
 *       200:
 *         description: The User was successfully get
 *       500:
 *         description: Some server error
 */
router.get("/getDetails", UserController.getFirstLastName);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/register',userValidation,UserController.registerUserWithCompany)

/**
 * @swagger
 * /api/user/create/addRelation:
 *   get:
 *     summary: get a User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The User was successfully get
 *       500:
 *         description: Some server error
 */
router.get("/create/addRelation", UserController.getAddRelation);


module.exports=router




// /**
//  * @swagger
//  * /api/login/add:
//  *   post:
//  *     summary: Create a new Login
//  *     tags: [Login]
//  *     parameters:
//  *      - in: query
//  *        name: email
//  *        schema:
//  *         type: string
//  *        required: true
//  *        description: The User email
//  *      - in: query
//  *        name: password
//  *        schema:
//  *         type: string
//  *        required: true
//  *        description: The User password
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