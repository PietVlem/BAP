/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Building } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class BuildingController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let buildings = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                buildings = await Building.paginate({}, options);
            } else {
                buildings = await Building.find().sort({ created_at: -1 }).exec();
            }

            if (buildings === undefined || buildings === null) {
                throw new APIError(404, 'Collection for buildings not found!');
            }
            return res.status(200).json(buildings);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving buildings', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Building.findById(id).populate('category').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Building with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving buildings', next);
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
            const buildingCreate = new Building({
                name: req.body.name,
                image: req.body.image,
                coords:{
                    longitude: req.body.longitude,
                    latitude: req.body.latitude
                }
            });
            const building = await buildingCreate.save();
            return res.status(201).json(building);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Building!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const building = await Building.findById(id).exec();

            if (!building) {
                throw new APIError(404, `Building with id: ${id} not found!`);
            } else {
                const vm = {
                    building,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Building with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const buildingUpdate = req.body;
            const building = await Building.findOneAndUpdate({ _id: id }, buildingUpdate, { new: true }).exec();

            if (!building) {
                throw new APIError(404, `Building with id: ${id} not found!`);
            }
            return res.status(200).json(building);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Building with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let building = null;

            let { mode } = req.query;
            if (mode) {
                building = await Building.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                building = await Building.findOneAndRemove({ _id: id });
            }

            if (!building) {
                throw new APIError(404, `Building with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Building with id: ${id}!`, building, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Building with id: ${id}!`, next);
        }
    }
}

export default BuildingController;
