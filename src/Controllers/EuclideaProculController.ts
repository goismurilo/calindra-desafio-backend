import { Request, Response } from 'express'
import EuclideaProculService from "../Services/EuclideaProculService";

interface IResponse {
    minDistance: string[];
    maxDistance: string[];
    allComparation: string[];
}

export default class EuclideaProculController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { address, keyGoogle } = request.body

        const euclideaProculService = new EuclideaProculService()

        const returnData: IResponse = await euclideaProculService.execute({
            address,
            keyGoogle,
        })

        return response.json(returnData)
    }
}