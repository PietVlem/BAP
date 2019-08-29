/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { HelpCentreItem } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class HelpCentreItemController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let helpCentreItems = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                helpCentreItems = await HelpCentreItem.paginate({}, options);
            } else {
                helpCentreItems = await HelpCentreItem.find().sort({ created_at: -1 }).exec();
            }

            if (helpCentreItems === undefined || helpCentreItems === null) {
                throw new APIError(404, 'Collection for helpCentreItems not found!');
            }
            return res.status(200).json(helpCentreItems);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving helpCentreItems', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await HelpCentreItem.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `HelpCentreItem with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving helpCentreItems', next);
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
            const helpCentreItemCreate = new HelpCentreItem({
                name: req.body.name,
                helpCentreItemplan: req.body.helpCentreItemplan,
                buildingId: req.body.buildingId
            });
            const helpCentreItem = await helpCentreItemCreate.save();
            return res.status(201).json(helpCentreItem);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the HelpCentreItem!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const helpCentreItem = await HelpCentreItem.findById(id).exec();

            if (!helpCentreItem) {
                throw new APIError(404, `HelpCentreItem with id: ${id} not found!`);
            } else {
                const vm = {
                    helpCentreItem,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HelpCentreItem with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const helpCentreItemUpdate = req.body;
            const helpCentreItem = await HelpCentreItem.findOneAndUpdate({ _id: id }, helpCentreItemUpdate, { new: true }).exec();

            if (!helpCentreItem) {
                throw new APIError(404, `HelpCentreItem with id: ${id} not found!`);
            }
            return res.status(200).json(helpCentreItem);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HelpCentreItem with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let helpCentreItem = null;

            let { mode } = req.query;
            if (mode) {
                helpCentreItem = await HelpCentreItem.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                helpCentreItem = await HelpCentreItem.findOneAndRemove({ _id: id });
            }

            if (!helpCentreItem) {
                throw new APIError(404, `HelpCentreItem with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the HelpCentreItem with id: ${id}!`, helpCentreItem, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HelpCentreItem with id: ${id}!`, next);
        }
    }
}

export default HelpCentreItemController;
