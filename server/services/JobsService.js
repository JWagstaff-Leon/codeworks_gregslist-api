import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class JobsService
{
    async getAll()
    {
        return await dbContext.Jobs.find({}).populate("creator", "name");
    }

    async getByID(id)
    {
        const found = await dbContext.Jobs.findById(id).populate("creator", "name");
        if(!found)
        {
            throw new BadRequest(`Job with id ${id} not found.`)
        }
        return found;
    }

    async create(body)
    {
        const created = await dbContext.Jobs.create(body);
        created.populate("creator", "name");
        return created;
    }

    async edit(update)
    {
        const original = await this.getByID(update.id);
        if(original.creatorID.toString() !== update.creatorID)
        {
            throw new Forbidden(`You don't have access rights to job with id ${update.id}`);
        }
        original.jobTitle = update.jobTitle || original.jobTitle;
        original.rate = update.rate || original.rate;
        original.hours = update.hours || original.hours;
        original.description = update.description || original.description;
        original.company = update.company || original.company;

        await original.save();
        return original;
    }

    async remove(id, userID)
    {
        const deleted = await this.getByID(id);
        if(deleted.creatorID.toString() !== userID)
        {
            throw new Forbidden(`You don't have access rights to job with id ${update.id}`);
        }
        await dbContext.Jobs.findByIdAndDelete(id);
        return deleted;
    }
}

export const jobsService = new JobsService();