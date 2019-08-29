/*
Import the internal libraries:
- BuildingController
*/
import { BuildingController } from '../controller';

// Create instance of BuildingController otherwise you can't use it
const buildingController = new BuildingController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/buildings:
     *   get:
     *     tags:
     *       - Buildings
     *     description: Returns all buildings
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of buildings
     */
    parentRouter.get('/buildings', buildingController.index);
    /**
     * @swagger
     * /api/v1/buildings/create:
     *   get:
     *     tags:
     *       - Building
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create building
     */
    parentRouter.get('/buildings/create/', buildingController.create);
    /**
     * @swagger
     * /api/v1/buildings/{id}:
     *   get:
     *     tags:
     *       - Building
     *     description: Returns specific building
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Building id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get building by id
     */
    parentRouter.get('/buildings/:id', buildingController.show);
    /**
     * @swagger
     * /api/v1/buildings:
     *   building:
     *     tags:
     *       - Building
     *     description: Save building
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: building
     *         description: Building object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved building
     */
    parentRouter.post('/buildings', buildingController.store);
    /**
     * @swagger
     * /api/v1/buildings/{id}/edit:
     *   get:
     *     tags:
     *       - Building
     *     description: Returns specific viewmodel such as building, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Building id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit building by id
     */
    parentRouter.get('/buildings/:id/edit', buildingController.edit);
    /**
     * @swagger
     * /api/v1/buildings/{id}:
     *   put:
     *     tags:
     *       - Building
     *     description: Update specific building detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Building id
     *         in: path
     *         required: true
     *         type: string
     *       - name: building object
     *         description: building data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update building
     */
    parentRouter.put('/buildings/:id', buildingController.update);
    /**
     * @swagger
     * /api/v1/buildings/{id}:
     *   delete:
     *     tags:
     *       - Building
     *     description: Delete specific building detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Building id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete building
     */
    parentRouter.delete('/buildings/:id', buildingController.destroy);
};

export default initializeEndpoints;
