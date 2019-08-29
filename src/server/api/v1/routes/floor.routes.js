/*
Import the internal libraries:
- FloorController
*/
import { FloorController } from '../controller';

// Create instance of FloorController otherwise you can't use it
const floorController = new FloorController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/floors:
     *   get:
     *     tags:
     *       - Floors
     *     description: Returns all floors
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of floors
     */
    parentRouter.get('/floors', floorController.index);
    /**
     * @swagger
     * /api/v1/floors/create:
     *   get:
     *     tags:
     *       - Floor
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create floor
     */
    parentRouter.get('/floors/create/', floorController.create);
    /**
     * @swagger
     * /api/v1/floors/{id}:
     *   get:
     *     tags:
     *       - Floor
     *     description: Returns specific floor
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Floor id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get floor by id
     */
    parentRouter.get('/floors/:id', floorController.show);
    /**
     * @swagger
     * /api/v1/floors:
     *   floor:
     *     tags:
     *       - Floor
     *     description: Save floor
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: floor
     *         description: Floor object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved floor
     */
    parentRouter.post('/floors', floorController.store);
    /**
     * @swagger
     * /api/v1/floors/{id}/edit:
     *   get:
     *     tags:
     *       - Floor
     *     description: Returns specific viewmodel such as floor, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Floor id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit floor by id
     */
    parentRouter.get('/floors/:id/edit', floorController.edit);
    /**
     * @swagger
     * /api/v1/floors/{id}:
     *   put:
     *     tags:
     *       - Floor
     *     description: Update specific floor detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Floor id
     *         in: path
     *         required: true
     *         type: string
     *       - name: floor object
     *         description: floor data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update floor
     */
    parentRouter.put('/floors/:id', floorController.update);
    /**
     * @swagger
     * /api/v1/floors/{id}:
     *   delete:
     *     tags:
     *       - Floor
     *     description: Delete specific floor detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Floor id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete floor
     */
    parentRouter.delete('/floors/:id', floorController.destroy);
};

export default initializeEndpoints;
