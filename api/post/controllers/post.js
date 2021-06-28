const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.post.search(ctx.query);
        } else {
          entities = await strapi.services.post.find(ctx.query);
        }
    
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.post }));
      },
      async findById(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.post.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.post });
      },
      count(ctx) {
        if (ctx.query._q) {
          return strapi.services.post.countSearch(ctx.query);
        }
        return strapi.services.post.count(ctx.query);
      },
      async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.post.create(data, { files });
        } else {
          entity = await strapi.services.post.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.post });
      },
      async update(ctx) {
        const { id } = ctx.params;
    
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.post.update({ id }, data, {
            files,
          });
        } else {
          entity = await strapi.services.post.update({ id }, ctx.request.body);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.post });
      },
      async delete(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.post.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.post });
      },
};
