import { Router } from 'express'

import EuclideaProculController from '../Controllers/EuclideaProculController'

const euclideaProculController = new EuclideaProculController()
const euclideaRoute = Router()

euclideaRoute.get('/', euclideaProculController.create)

export default euclideaRoute