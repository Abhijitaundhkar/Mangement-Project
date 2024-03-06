const express = require("express");
const companyController = require("../controller/Company/companyController");
const CompanyValidation=require("../controller/Company/companyValidator")
const routers = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - companyName
 *         - address
 *       properties:
 *         companyName:
 *           type: string
 *           description: The name of the company
 *         address:
 *           type: string
 *           description: The company title
 *         phoneNo:
 *           type: number
 *           description: The book author
 *       example:
 *         companyName: infosys
 *         address: Dighanchi
 */


/**
 * @swagger
 * /api/company/info:
 *   get:
 *     summary: Returns the list of all the Company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: The list of the Company
 */
routers.get('/info',companyController.getCompany)

/**
 * @swagger
 * /api/company/{id}:
 *    get:
 *     summary: Returns the company
 *     tags: [Company]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company id
 *     responses:
 *       200:
 *         description: The list of the company
 */
routers.get('/:id',companyController.getCompanyById)

/** 
* @swagger
 * /api/company/create:
 *   post:
 *     summary: Create a new Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The Company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */
routers.post('/create',CompanyValidation,companyController.addCompany)

/**
 * @swagger
 * /api/company/update/{id}:
 *   put:
 *    summary: Update the company by the id
 *    tags: [Company]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The company id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *       200:
 *         description: The User was updated
 *       404:
 *         description: The User was not found
 */

routers.put("/update/:id", companyController.updateCompany);

/**
 * @swagger
 * /api/company/remove/{id}:
 *   delete:
 *     summary: Remove the User by id
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 * 
 *     responses:
 *       200:
 *         description: The User was deleted
 *       404:
 *         description: The User was not found
 */

routers.delete("/remove/:id", companyController.deleteCompany);

/** 
* @swagger
 * /api/company/addRelation:
 *   post:
 *     summary: Create a new Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The Company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */
routers.post('/addRelation',CompanyValidation,companyController.addRelation)

module.exports = routers;
