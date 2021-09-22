const { AuthorService } = require('../services/author.service')

const checkExistingAuthor = async (req, res, next) => {
    try {
        req.id_author = await AuthorService.exists(req.body.name, req.body.last_name);
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    checkExistingAuthor
}