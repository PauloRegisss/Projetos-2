import type { MiddlewareHandler } from "hono";

const logger = (): MiddlewareHandler => {
	return async (c, next) => {
		const path = c.req.path;
		c.header("x-pathname", path);
		await next();
	};
};

export default logger;
