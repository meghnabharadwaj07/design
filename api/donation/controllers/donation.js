const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.donation.search(ctx.query);
        } else {
          entities = await strapi.services.donation.find(ctx.query);
        }
    
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.donation }));
      },
      async findById(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.donation.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.donation });
      },
      count(ctx) {
        if (ctx.query._q) {
          return strapi.services.donation.countSearch(ctx.query);
        }
        return strapi.services.donation.count(ctx.query);
      },
      async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.donation.create(data, { files });
        } else {
          entity = await strapi.services.donation.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.donation });
      },
      async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.donation.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.donation.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.donation });
      },
      async delete(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.donation.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.donation });
      },
};
