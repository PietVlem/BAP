/*
Import the internal libraries:
- MeetingController
*/
import { MeetingController } from '../controller';

// Create instance of MeetingController otherwise you can't use it
const meetingController = new MeetingController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/meetings:
     *   get:
     *     tags:
     *       - Meetings
     *     description: Returns all meetings
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of meetings
     */
    parentRouter.get('/meetings', meetingController.index);
    /**
     * @swagger
     * /api/v1/meetings/create:
     *   get:
     *     tags:
     *       - Meeting
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create meeting
     */
    parentRouter.get('/meetings/create/', meetingController.create);
    /**
     * @swagger
     * /api/v1/meetings/{id}:
     *   get:
     *     tags:
     *       - Meeting
     *     description: Returns specific meeting
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Meeting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get meeting by id
     */
    parentRouter.get('/meetings/:id', meetingController.show);
    /**
     * @swagger
     * /api/v1/meetings:
     *   meeting:
     *     tags:
     *       - Meeting
     *     description: Save meeting
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: meeting
     *         description: Meeting object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved meeting
     */
    parentRouter.post('/meetings', meetingController.store);
    /**
     * @swagger
     * /api/v1/meetings/{id}/edit:
     *   get:
     *     tags:
     *       - Meeting
     *     description: Returns specific viewmodel such as meeting, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Meeting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit meeting by id
     */
    parentRouter.get('/meetings/:id/edit', meetingController.edit);
    /**
     * @swagger
     * /api/v1/meetings/{id}:
     *   put:
     *     tags:
     *       - Meeting
     *     description: Update specific meeting detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Meeting id
     *         in: path
     *         required: true
     *         type: string
     *       - name: meeting object
     *         description: meeting data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update meeting
     */
    parentRouter.put('/meetings/:id', meetingController.update);
    /**
     * @swagger
     * /api/v1/meetings/{id}:
     *   delete:
     *     tags:
     *       - Meeting
     *     description: Delete specific meeting detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Meeting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete meeting
     */
    parentRouter.delete('/meetings/:id', meetingController.destroy);
};

export default initializeEndpoints;
