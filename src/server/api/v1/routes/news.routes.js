/*
Import the internal libraries:
- NewsController
*/
import { NewsController } from '../controller';

// Create instance of NewsController otherwise you can't use it
const newsController = new NewsController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/news:
     *   get:
     *     tags:
     *       - News
     *     description: Returns all news
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of news
     */
    parentRouter.get('/news', newsController.index);
    /**
     * @swagger
     * /api/v1/news/create:
     *   get:
     *     tags:
     *       - News
     *     description: Returns specific viewmodel such as news
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/news/create/', newsController.create);
    /**
     * @swagger
     * /api/v1/news/{id}:
     *   get:
     *     tags:
     *       - News
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: News id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/news/:id', newsController.show);
    /**
     * @swagger
     * /api/v1/news:
     *   post:
     *     tags:
     *       - News
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: News object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/news', newsController.store);
    /**
     * @swagger
     * /api/v1/news/{id}/edit:
     *   get:
     *     tags:
     *       - News
     *     description: Returns specific viewmodel such as post, news
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: News id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit news by id
     */
    parentRouter.get('/news/:id/edit', newsController.edit);
    /**
     * @swagger
     * /api/v1/news/{id}:
     *   put:
     *     tags:
     *       - News
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: News id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: news data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update news
     */
    parentRouter.put('/news/:id', newsController.update);
    /**
     * @swagger
     * /api/v1/news/{id}:
     *   delete:
     *     tags:
     *       - News
     *     description: Delete specific news
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: News id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete news
     */
    parentRouter.delete('/news/:id', newsController.destroy);
};

export default initializeEndpoints;
