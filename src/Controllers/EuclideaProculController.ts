import { Request, Response } from 'express'
import EuclideaProculService from "../Services/EuclideaProculService";

interface IReturn {
    minProcul: string;
    maxProcul: string;
    allProcul: string[];
}

interface IRequest {
    address: string;
}

export default class EuclideaProculController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const address: any = request.params.end

        const euclideaProculService = new EuclideaProculService()

        const returnData = await euclideaProculService.execute()

        return response.json(address)
    }
}