import authController from "../../../mvc/auth/controller"
export default defineEventHandler(event => {
    return authController(event)
})
