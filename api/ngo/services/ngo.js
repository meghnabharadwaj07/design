
const { isDraft } = require('strapi-utils').contentTypes;
module.exports = {
    find(params, populate) {
        return strapi.query('ngo').find(params, populate);
      },
      findOne(params, populate) {
        return strapi.query('ngo').findOne(params, populate);
      },
       count(params) {
        return strapi.query('ngo').count(params);
      },
      async create(data, { files } = {}) {
        const isDraft = isDraft(data, strapi.models.ngo);
        const validData = await strapi.entityValidator.validateEntityCreation(
          strapi.models.ngo,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('ngo').create(validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'ngo',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      async update(params, data, { files } = {}) {
        const existingEntry = await strapi.query('ngo').findOne(params);
    
        const isDraft = isDraft(existingEntry, strapi.models.ngo);
        const validData = await strapi.entityValidator.validateEntityUpdate(
          strapi.models.ngo,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('ngo').update(params, validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'ngo',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      countSearch(params) {
        return strapi.query('ngo').countSearch(params);
      },
      search(params) {
        return strapi.query('ngo').search(params);
      },
      delete(params) {
        return strapi.query('ngo').delete(params);
      },
};
