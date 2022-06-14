import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UserController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();

        console.log(request.user.id);


        return response.json(await listUsers.execute());
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {name, email, password } = request.body;
        const createUser = new CreateUserService();

        return response.json(await createUser.execute({
            name, email, password
        })
        );
    }
}
