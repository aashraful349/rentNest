const sendResponse = (res, data) => {
    res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data
    });
};
export default sendResponse;
//# sourceMappingURL=sendResponse.js.map