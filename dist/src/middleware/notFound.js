export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.Please enter a valid route",
    });
};
//# sourceMappingURL=notFound.js.map