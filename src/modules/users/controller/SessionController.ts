import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionsService";

export default class SessionController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const createSession = new CreateSessionsService();

        return response.json(await createSession.execute({ email, password }));
    }
}
