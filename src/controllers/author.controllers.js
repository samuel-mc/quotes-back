const { AuthorService } = require('../services/author.service');

const getAuthors = async (req, res) => {
    try {
        const authors = await AuthorService.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        res.status(400).json({ "message": "Error reading the authors: " + error.message});
    }
}

const getOneAuthor = async (req, res) => {
    const id_author = req.params.id;
    try {
        const author = await AuthorService.findById(id_author);
        !author
            ? res.status(404).json({ "message": "Error: Author not found"})
            : res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ "message": "Error reading the author: " + error.message});
    }
}

const putAuthor = async (req, res) => {
    const id_author = req.params.id;
    const { name, last_name } = req.body;
    try {
        const author = new AuthorService(id_author);
        await author.updateAuthor(name.toUpperCase(), last_name.toUpperCase());
        res.status(200).json({ "message": "Author updated successfully" });
    } catch (error) {
        res.status(400).json({ "message": "Error updating author: " + error.message})
    }
}

module.exports = {
    getAuthors,
    getOneAuthor,
    putAuthor
}