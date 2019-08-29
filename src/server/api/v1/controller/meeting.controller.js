/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Meeting } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class MeetingController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let meetings = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'category',
                    sort: { created_at: -1 },
                };
                meetings = await Meeting.paginate({}, options);
            } else {
                meetings = await Meeting.find().sort({ created_at: -1 }).exec();
            }

            if (meetings === undefined || meetings === null) {
                throw new APIError(404, 'Collection for meetings not found!');
            }
            return res.status(200).json(meetings);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving meetings', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Meeting.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Meeting with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving meetings', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            categories: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const meetingCreate = new Meeting({
                title: req.body.title,
                body: req.body.body,
                categoryId: req.body.categoryId,
                authorId: req.body.authorId
            });
            const meeting = await meetingCreate.save();
            return res.status(201).json(meeting);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Meeting!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const meeting = await Meeting.findById(id).exec();

            if (!meeting) {
                throw new APIError(404, `Meeting with id: ${id} not found!`);
            } else {
                const vm = {
                    meeting,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Meeting with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const meetingUpdate = req.body;
            const meeting = await Meeting.findOneAndUpdate({ _id: id }, meetingUpdate, { new: true }).exec();

            if (!meeting) {
                throw new APIError(404, `Meeting with id: ${id} not found!`);
            }
            return res.status(200).json(meeting);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Meeting with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let meeting = null;

            let { mode } = req.query;
            if (mode) {
                meeting = await Meeting.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                meeting = await Meeting.findOneAndRemove({ _id: id });
            }

            if (!meeting) {
                throw new APIError(404, `Meeting with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Meeting with id: ${id}!`, meeting, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Meeting with id: ${id}!`, next);
        }
    }
}

export default MeetingController;
