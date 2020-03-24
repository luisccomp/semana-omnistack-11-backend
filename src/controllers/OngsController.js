const crypto = require('crypto');

const connection = require('../database'); 

module.exports = {

    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.status(200)
            .json({ id });
    },

    async index(request, response) {
        return response.status(200)
            .json(await connection('ongs').select('*'));
    }
};
