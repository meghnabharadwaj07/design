
const { isDraft } = require('strapi-utils').contentTypes;
module.exports = {
    find(params, populate) {
        return strapi.query('donation').find(params, populate);
      },
      findOne(params, populate) {
        return strapi.query('donation').findOne(params, populate);
      },
       count(params) {
        return strapi.query('donation').count(params);
      },
      async create(data, { files } = {}) {
        const isDraft = isDraft(data, strapi.models.donation);
        const validData = await strapi.entityValidator.validateEntityCreation(
          strapi.models.donation,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('donation').create(validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'donation',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      async update(params, data, { files } = {}) {
        const existingEntry = await strapi.query('donation').findOne(params);
    
        const isDraft = isDraft(existingEntry, strapi.models.donation);
        const validData = await strapi.entityValidator.validateEntityUpdate(
          strapi.models.donation,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('donation').update(params, validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'donation',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      countSearch(params) {
        return strapi.query('donation').countSearch(params);
      },
      search(params) {
        return strapi.query('donation').search(params);
      },
      delete(params) {
        return strapi.query('donation').delete(params);
      },
};
