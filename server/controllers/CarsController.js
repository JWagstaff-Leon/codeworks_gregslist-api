import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController
{
    constructor()
    {
        super("api/cars");

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
            const foundCars = await carsService.getAll();
            return res.send(foundCars);
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
            const foundCar = await carsService.getByID(req.params.id);
            return res.send(foundCar);
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
            const newCar = await carsService.create(req.body);
            return res.send(newCar);
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
            const editedCar = await carsService.edit(req.body);
            return res.send(editedCar);
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
            const deletedCar = await carsService.remove(req.params.id, req.userInfo.id);
            return res.send(deletedCar);
        }
        catch(error)
        {
            next(error);
        }
    }

}