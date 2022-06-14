import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/updateUserAvatarService";


export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        return response.json(updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename
        })
        );
    }
}
