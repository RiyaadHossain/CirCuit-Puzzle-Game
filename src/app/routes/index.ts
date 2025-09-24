import { Router } from 'express'
const router = Router()
import authRoutes from "../modules/auth/auth.routes"


const moduleRoutes = [{ path: '/auth', route: authRoutes }]

const routes = moduleRoutes.map((route) => 
    router.use(route.path, route.route )
)

export default routes