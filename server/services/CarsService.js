import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CarsService
{
    async getAll()
    {
        return await dbContext.Cars.find({}).populate("creator", "name");
    }

    async getByID(id)
    {
        const found = await dbContext.Cars.findById(id).populate("creator", "name");
        if(!found)
        {
            throw new BadRequest(`Car with id ${id} not found.`);
        }
        return found;
    }

    async create(body)
    {
        const created = await dbContext.Cars.create(body);
        created.populate("creator", "name");
        return created;
    }

    async edit(update)
    {
        const original = await this.getByID(update.id); 
        if(original.creatorID.toString() !== update.creatorID)
        {
            throw new Forbidden(`You don't have access rights to car with id ${update.id}`);
        }
        original.make = update.make || original.make;
        original.model = update.model || original.model;
        original.color = update.color || original.color;
        original.year = update.year || original.year;
        original.price = update.price || original.price;
        original.description = update.description || original.description;
        original.imgUrl = update.imgUrl || original.imgUrl;

        await original.save();
        return original;
    }

    async remove(id, userID)
    {
        const deleted = await this.getByID(id);
        if(deleted.creatorID.toString() !== userID)
        {
            throw new Forbidden(`You don't have access rights to car with id ${update.id}`);
        }
        await dbContext.Cars.findByIdAndDelete(id);
        return deleted;
    }
}

export const carsService = new CarsService();