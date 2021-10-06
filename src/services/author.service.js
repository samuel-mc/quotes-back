const { Author } = require('../models/author.model');

class AuthorService {
    // Constructor cuando requerimos solo el id
    constructor (id_author) {
        this.id_author = id_author;
    }

    // Agregamos un author a la base de datos
    addAuthor (name, last_name) {
        try {
            Author.create({
                id_author: this.id_author,
                name: name.toUpperCase(),
                last_name: last_name.toUpperCase(),
                likes: 0
            });
        } catch (error) {
            throw new Error(error);
        }
    }
    static getAllAuthors() {
        try {
            const authors = Author.findAll({});
            return authors;
        } catch (error) {
            throw new Error(error);
        }
    }

    static findById(id_author) {
        try {
            const author = Author.findOne({ where: { id_author }});
            return author;
        } catch (error) {
            throw new Error(error);
        }
    }

    updateAuthor(name, last_name) {
        try {
            Author.update({name, last_name}, { where: { id_author: this.id_author}});
        } catch (error) {
            throw new Error(error);
        }
    }

    //Verifica si el author ya existe en la base de datos
    static async exists  (name, last_name) {
        name = name.toUpperCase();
        last_name = last_name.toUpperCase();
        const author = await Author.findOne({ where: { name, last_name }});
        if (author) {
            return author.dataValues.id_author;
        } else {
            return null;
        }
    }
}

module.exports = { AuthorService };