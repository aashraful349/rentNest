import { NextFunction, Request, Response } from "express";
export declare const landLordController: {
    createProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteProperty: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    rentalRequestsForLandLordsProperties: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    approveOrRejectRentalRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=landLord.controller.d.ts.map