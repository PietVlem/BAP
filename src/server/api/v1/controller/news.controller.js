/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { News } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class NewsController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const newss = await News.find().populate('__category').sort({ created_at: -1 }).exec();

            if (newss === undefined || newss === null) {
                throw new APIError(404, 'Collection for newss not found!');
            }
            return res.status(200).json(newss);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving newss', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await News.findById(id).populate('__category').populate('__posts').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `News with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving newss', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            newss: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const categoryCreate = new News({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const news = await categoryCreate.save();
            return res.status(201).json(news);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the News!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const news = await News.findById(id).exec();

            if (!news) {
                throw new APIError(404, `News with id: ${id} not found!`);
            } else {
                const vm = {
                    news,
                    newss: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the News with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const categoryUpdate = req.body;
            const news = await News.findOneAndUpdate({ _id: id }, categoryUpdate, { new: true }).exec();

            if (!news) {
                throw new APIError(404, `News with id: ${id} not found!`);
            }
            return res.status(200).json(news);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the News with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            const news = await News.findOneAndRemove({ _id: id });

            if (!news) {
                throw new APIError(404, `News with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the News with id: ${id}!` });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the News with id: ${id}!`, next);
        }
    }
}

export default NewsController;
