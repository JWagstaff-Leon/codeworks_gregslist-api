import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController
{
    constructor()
    {
        super("api/houses");

        this.router
            .get("", this.getAll)
            .get("/:id", this.getByID)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.remove)
    }

    async getAll(req, res, next)
    {
        try
        {
            const foundHouses = await housesService.getAll();
            return res.send(foundHouses);
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
            const foundHouse = await housesService.getByID(req.params.id);
            return res.send(foundHouse);
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
            const newHouse = await housesService.create(req.body);
            return res.send(newHouse);
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
            const editedHouse = await housesService.edit(req.body);
            return res.send(editedHouse);
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
            const deletedHouse = await housesService.remove(req.params.id, req.userInfo.id);
            return res.send(deletedHouse);
        }
        catch(error)
        {
            next(error);
        }
    }

}