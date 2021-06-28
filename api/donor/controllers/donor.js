const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.donor.search(ctx.query);
        } else {
          entities = await strapi.services.donor.find(ctx.query);
        }
    
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.donor }));
      },
      async findById(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.donor.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.donor });
      },
      count(ctx) {
        if (ctx.query._q) {
          return strapi.services.donor.countSearch(ctx.query);
        }
        return strapi.services.donor.count(ctx.query);
      },
      async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.donor.create(data, { files });
        } else {
          entity = await strapi.services.donor.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.donor });
      },
      async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.donor.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.donor.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.donor });
      },
      async delete(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.donor.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.donor });
      },
};
