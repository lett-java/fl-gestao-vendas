import { EntityRepository, Repository } from "typeorm";
import UserToken from "../typeorm/entities/UserToken";

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        return await this.findOne({
            where: {
                token
            }
        });
    }

    public async generate(userId: string): Promise<UserToken | undefined> {
        return await this.save(
            this.create({
                userId
            })
        );
    }
}

export default UserTokenRepository;
