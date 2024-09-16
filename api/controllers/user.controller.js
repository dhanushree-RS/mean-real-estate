// routes.js
export const test = (req, res) => {
    res.send('Test Route');
};

export const jsonRoute = (req, res) => {
    res.json({
        message: 'API is working!'
    });
};
