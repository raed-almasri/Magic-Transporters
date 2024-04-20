import NodeCache from "node-cache";
const nodeCache = new NodeCache();
import { StatusCodes } from "http-status-codes";
// import {
//     // addToRedisCache,
//     getAllInRedis,
//     getFromRedisCache,
//     redis,
// } from "../utils/redis_cache.js";

// getAllInRedis();
export let cache = async (req, res, next) => {
    try {
        res.cache = nodeCache;
        // check if request method is GET
        if (req.method !== "GET") return next();

        // check if request key is exists in cache
        const key = req.originalUrl;
        // const cachedResponse = await getFromRedisCache(key);

        if (cachedResponse) {
            return res.status(StatusCodes.OK).json({
                success: true,
                data: cachedResponse,
            });
        } else {
            res.originalSend = res.json;
            async (body) => {
                // to execute the real code and then store result in node cache
                res.originalSend(body);
                // nodeCache.set(
                //     key,
                //     JSON.parse(body).data,
                //     360 * 24 * 60 * 60 * 1000
                // );
                console.log(body);
                // await addToRedisCache(key, JSON.parse(body).data);
                return;
            };
            next();
        }
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: err.message,
        });
    }
};
export let addToCache = (id, body) => {
    nodeCache.set(id, body);
};
export let deleteFromCache = (items) => {
    nodeCache.del([...items]);
};
export let getFromCache = (id) => nodeCache.get(id);
export function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;
    // redis.get(key, (err, data) => {
    //     if (err) throw err;
    //     if (data !== null) {
    //         res.send(JSON.parse(data));
    //     } else {
    //         next();
    //     }
    // });
}
