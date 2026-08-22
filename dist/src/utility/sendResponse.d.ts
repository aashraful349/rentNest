import { Response } from "express";
import { TResponseData } from "./util.interface";
declare const sendResponse: <T>(res: Response, data: TResponseData<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map