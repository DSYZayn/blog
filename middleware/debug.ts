import { Logger } from "~/utils/Logger"
const logger = new Logger('debug', 'debug')
export default defineNuxtRouteMiddleware((to, from) => {
    logger.info("to:", to)
    logger.info("from:", from)
})