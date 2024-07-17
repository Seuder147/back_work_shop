const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next(); // Переходимо до наступного middleware для OPTIONS запитів
    }

    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const tokenValue = token.split(' ')[1];
        req.user = jwt.verify(tokenValue, process.env.SECRET_KEY); // Додаємо розшифрований об'єкт з інформацією про користувача у req
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: "Not authorized" });
    }
};
