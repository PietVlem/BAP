/*
Import the internal libraries:
- NewsPostController
*/
import { NewsPostController } from '../controller';

// Create instance of NewsPostController otherwise you can't use it
const newspostController = new NewsPostController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/newsposts:
     *   get:
     *     tags:
     *       - NewsPosts
     *     description: Returns all newsposts
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of newsposts
     */
    parentRouter.get('/newsposts', newspostController.index);
    /**
     * @swagger
     * /api/v1/newsposts/create:
     *   get:
     *     tags:
     *       - NewsPost
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create newspost
     */
    parentRouter.get('/newsposts/create/', newspostController.create);
    /**
     * @swagger
     * /api/v1/newsposts/{id}:
     *   get:
     *     tags:
     *       - NewsPost
     *     description: Returns specific newspost
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: NewsPost id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get newspost by id
     */
    parentRouter.get('/newsposts/:id', newspostController.show);
    /**
     * @swagger
     * /api/v1/newsposts:
     *   newspost:
     *     tags:
     *       - NewsPost
     *     description: Save newspost
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: newspost
     *         description: NewsPost object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved newspost
     */
    parentRouter.post('/newsposts', newspostController.store);
    /**
     * @swagger
     * /api/v1/newsposts/{id}/edit:
     *   get:
     *     tags:
     *       - NewsPost
     *     description: Returns specific viewmodel such as newspost, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: NewsPost id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit newspost by id
     */
    parentRouter.get('/newsposts/:id/edit', newspostController.edit);
    /**
     * @swagger
     * /api/v1/newsposts/{id}:
     *   put:
     *     tags:
     *       - NewsPost
     *     description: Update specific newspost detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: NewsPost id
     *         in: path
     *         required: true
     *         type: string
     *       - name: newspost object
     *         description: newspost data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update newspost
     */
    parentRouter.put('/newsposts/:id', newspostController.update);
    /**
     * @swagger
     * /api/v1/newsposts/{id}:
     *   delete:
     *     tags:
     *       - NewsPost
     *     description: Delete specific newspost detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: NewsPost id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete newspost
     */
    parentRouter.delete('/newsposts/:id', newspostController.destroy);
};

export default initializeEndpoints;
