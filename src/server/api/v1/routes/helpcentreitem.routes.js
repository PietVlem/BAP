/*
Import the internal libraries:
- HelpCentreItemController
*/
import { HelpCentreItemController } from '../controller';

// Create instance of HelpCentreItemController otherwise you can't use it
const helpCentreItemController = new HelpCentreItemController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/helpCentreItems:
     *   get:
     *     tags:
     *       - HelpCentreItems
     *     description: Returns all helpCentreItems
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of helpCentreItems
     */
    parentRouter.get('/helpCentreItems', helpCentreItemController.index);
    /**
     * @swagger
     * /api/v1/helpCentreItems/create:
     *   get:
     *     tags:
     *       - HelpCentreItem
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create helpCentreItem
     */
    parentRouter.get('/helpCentreItems/create/', helpCentreItemController.create);
    /**
     * @swagger
     * /api/v1/helpCentreItems/{id}:
     *   get:
     *     tags:
     *       - HelpCentreItem
     *     description: Returns specific helpCentreItem
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HelpCentreItem id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get helpCentreItem by id
     */
    parentRouter.get('/helpCentreItems/:id', helpCentreItemController.show);
    /**
     * @swagger
     * /api/v1/helpCentreItems:
     *   helpCentreItem:
     *     tags:
     *       - HelpCentreItem
     *     description: Save helpCentreItem
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: helpCentreItem
     *         description: HelpCentreItem object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved helpCentreItem
     */
    parentRouter.post('/helpCentreItems', helpCentreItemController.store);
    /**
     * @swagger
     * /api/v1/helpCentreItems/{id}/edit:
     *   get:
     *     tags:
     *       - HelpCentreItem
     *     description: Returns specific viewmodel such as helpCentreItem, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HelpCentreItem id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit helpCentreItem by id
     */
    parentRouter.get('/helpCentreItems/:id/edit', helpCentreItemController.edit);
    /**
     * @swagger
     * /api/v1/helpCentreItems/{id}:
     *   put:
     *     tags:
     *       - HelpCentreItem
     *     description: Update specific helpCentreItem detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HelpCentreItem id
     *         in: path
     *         required: true
     *         type: string
     *       - name: helpCentreItem object
     *         description: helpCentreItem data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update helpCentreItem
     */
    parentRouter.put('/helpCentreItems/:id', helpCentreItemController.update);
    /**
     * @swagger
     * /api/v1/helpCentreItems/{id}:
     *   delete:
     *     tags:
     *       - HelpCentreItem
     *     description: Delete specific helpCentreItem detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HelpCentreItem id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete helpCentreItem
     */
    parentRouter.delete('/helpCentreItems/:id', helpCentreItemController.destroy);
};

export default initializeEndpoints;
