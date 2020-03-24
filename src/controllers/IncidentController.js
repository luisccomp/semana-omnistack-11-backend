const connection = require('../database');


module.exports = {

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [ id ] = await connection('incidents').insert({
           description,
           ong_id,
           title,
           value 
        });

        return response.json({ id });
    },

    async index(request, response) {
        const { page } = request.query;

        const [count] = await connection('incidents')
            .count();

        response.header('X-Total-Count', count['count(*)']);

        return response.json(await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']));
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        console.log(incident);

        if (incident.ong_id !== ong_id)
            return response.status(401)
                .send();

        await connection('incidents').delete().where('id', id);

        return response.status(204)
            .send();
    }
};
