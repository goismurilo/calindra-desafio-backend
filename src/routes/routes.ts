import { Request, Response } from 'express'

import CreateRouteService from '../Services/CreateRouteService'

export function createRouteService(request: Request, response: Response) {
    CreateRouteService.execute("request.body.address")

    return response.send()
}