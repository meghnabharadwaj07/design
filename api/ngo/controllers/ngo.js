const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.ngo.search(ctx.query);
        } else {
          entities = await strapi.services.ngo.find(ctx.query);
        }
    
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.ngo }));
      },
      async findById(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.ngo.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.ngo });
      },
      count(ctx) {
        if (ctx.query._q) {
          return strapi.services.ngo.countSearch(ctx.query);
        }
        return strapi.services.ngo.count(ctx.query);
      },
      async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.ngo.create(data, { files });
        } else {
          entity = await strapi.services.ngo.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.ngo });
      },
      async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.ngo.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.ngo.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.ngo });
      },
      async delete(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.ngo.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.ngo });
      },
};
