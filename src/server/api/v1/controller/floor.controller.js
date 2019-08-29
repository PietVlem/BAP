/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Floor } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class FloorController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let floors = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                floors = await Floor.paginate({}, options);
            } else {
                floors = await Floor.find().populate('building').sort({ created_at: -1 }).exec();
            }

            if (floors === undefined || floors === null) {
                throw new APIError(404, 'Collection for floors not found!');
            }
            return res.status(200).json(floors);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving floors', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Floor.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Floor with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving floors', next);
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
            const floorCreate = new Floor({
                name: req.body.name,
                floorplan: req.body.floorplan,
                buildingId: req.body.buildingId
            });
            const floor = await floorCreate.save();
            return res.status(201).json(floor);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Floor!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const floor = await Floor.findById(id).exec();

            if (!floor) {
                throw new APIError(404, `Floor with id: ${id} not found!`);
            } else {
                const vm = {
                    floor,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Floor with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const floorUpdate = req.body;
            const floor = await Floor.findOneAndUpdate({ _id: id }, floorUpdate, { new: true }).exec();

            if (!floor) {
                throw new APIError(404, `Floor with id: ${id} not found!`);
            }
            return res.status(200).json(floor);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Floor with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let floor = null;

            let { mode } = req.query;
            if (mode) {
                floor = await Floor.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                floor = await Floor.findOneAndRemove({ _id: id });
            }

            if (!floor) {
                throw new APIError(404, `Floor with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Floor with id: ${id}!`, floor, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Floor with id: ${id}!`, next);
        }
    }
}

export default FloorController;
