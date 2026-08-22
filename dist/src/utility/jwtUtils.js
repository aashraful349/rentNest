import jwt from "jsonwebtoken";
const createToken = (payLoad, secret, expiresIn) => {
    const token = jwt.sign(payLoad, secret, expiresIn);
    return token;
};
const compareTokenResult = (token, secret) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        return {
            success: true,
            data: decodedToken,
        };
    }
    catch (error) {
        return {
            success: false,
        };
    }
};
export const jwtUtils = {
    createToken,
    compareTokenResult,
};
//# sourceMappingURL=jwtUtils.js.map