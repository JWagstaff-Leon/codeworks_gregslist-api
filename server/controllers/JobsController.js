import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController
{
    constructor()
    {
        super("api/jobs");

        this.router
            .get("", this.getAll)
            .get("/:id", this.getByID)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.remove);
    }

    async getAll(req, res, next)
    {
        try
        {
            const foundJobs = await jobsService.getAll();
            return res.send(foundJobs);
        }
        catch(error)
        {
            next(error);
        }
    }

    async getByID(req, res, next)
    {
        try
        {
            const foundJob = await jobsService.getByID(req.params.id);
            return res.send(foundJob);
        }
        catch(error)
        {
            next(error);
        }
    }

    async create(req, res, next)
    {
        try
        {
            req.body.creatorID = req.userInfo.id;
            const newJob = await jobsService.create(req.body);
            return res.send(newJob);
        }
        catch(error)
        {
            next(error);
        }
    }

    async edit(req, res, next)
    {
        try
        {
            req.body.id = req.params.id;
            req.body.creatorID = req.userInfo.id;
            const editedJob = await jobsService.edit(req.body);
            return res.send(editedJob);
        }
        catch(error)
        {
            next(error);
        }
    }

    async remove(req, res, next)
    {
        try
        {
            const deletedJob = await jobsService.remove(req.params.id, req.userInfo.id);
            return res.send(deletedJob);
        }
        catch(error)
        {
            next(error);
        }
    }

}