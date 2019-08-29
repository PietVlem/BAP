/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { NewsPost } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class NewsPostController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let newsposts = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'category',
                    sort: { created_at: -1 },
                };
                newsposts = await NewsPost.paginate({}, options);
            } else {
                newsposts = await NewsPost.find().populate('category').sort({ created_at: -1 }).exec();
            }

            if (newsposts === undefined || newsposts === null) {
                throw new APIError(404, 'Collection for newsposts not found!');
            }
            return res.status(200).json(newsposts);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving newsposts', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await NewsPost.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `NewsPost with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving newsposts', next);
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
            const newspostCreate = new NewsPost({
                title: req.body.title,
                body: req.body.body,
                categoryId: req.body.categoryId,
                authorId: req.body.authorId
            });
            const newspost = await newspostCreate.save();
            return res.status(201).json(newspost);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the NewsPost!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const newspost = await NewsPost.findById(id).exec();

            if (!newspost) {
                throw new APIError(404, `NewsPost with id: ${id} not found!`);
            } else {
                const vm = {
                    newspost,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the NewsPost with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const newspostUpdate = req.body;
            const newspost = await NewsPost.findOneAndUpdate({ _id: id }, newspostUpdate, { new: true }).exec();

            if (!newspost) {
                throw new APIError(404, `NewsPost with id: ${id} not found!`);
            }
            return res.status(200).json(newspost);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the NewsPost with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let newspost = null;

            let { mode } = req.query;
            if (mode) {
                newspost = await NewsPost.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                newspost = await NewsPost.findOneAndRemove({ _id: id });
            }

            if (!newspost) {
                throw new APIError(404, `NewsPost with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the NewsPost with id: ${id}!`, newspost, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the NewsPost with id: ${id}!`, next);
        }
    }
}

export default NewsPostController;
