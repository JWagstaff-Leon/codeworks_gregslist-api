import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class HousesService
{
    async getAll()
    {
        return await dbContext.Houses.find({}).populate("creator", "name");
    }

    async getByID(id)
    {
        const found = await dbContext.Houses.findById(id)/populate("creator", "name");
        if(!found)
        {
            throw new BadRequest(`House with id ${id} not found.`);
        }
        return found;
    }

    async create(body)
    {
        const created = await dbContext.Houses.create(body);
        created.populate("creator", "name");
        return created;
    }

    async edit(update)
    {
        const original = await this.getByID(update.id);
        if(original.creatorID.toString() !== update.creatorID)
        {
            throw new Forbidden(`You don't have access rights to house with id ${update.id}`);
        }
        original.year = update.year || original.year;
        original.price = update.price || original.price;
        original.bathrooms = update.bathrooms || original.bathrooms;
        original.bedrooms = update.bedrooms || original.bedrooms;
        original.levels = update.levels || original.levels;
        original.imgUrl = update.imgUrl || original.imgUrl;
        original.description = update.description || original.description;

        await original.save();
        return original;
    }

    async remove(id, userID)
    {
        const deleted = await this.getByID(id);
        if(deleted.creatorID.toString() !== userID)
        {
            throw new Forbidden(`You don't have access rights to house with id ${update.id}`);
        }
        await dbContext.Houses.findByIdAndDelete(id);
        return deleted;
    }
}

export const housesService = new HousesService();