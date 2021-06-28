
const { isDraft } = require('strapi-utils').contentTypes;
module.exports = {
    find(params, populate) {
        return strapi.query('donor').find(params, populate);
      },
      findOne(params, populate) {
        return strapi.query('donor').findOne(params, populate);
      },
       count(params) {
        return strapi.query('donor').count(params);
      },
      async create(data, { files } = {}) {
        const isDraft = isDraft(data, strapi.models.donor);
        const validData = await strapi.entityValidator.validateEntityCreation(
          strapi.models.donor,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('donor').create(validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'donor',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      async update(params, data, { files } = {}) {
        const existingEntry = await strapi.query('donor').findOne(params);
    
        const isDraft = isDraft(existingEntry, strapi.models.donor);
        const validData = await strapi.entityValidator.validateEntityUpdate(
          strapi.models.donor,
          data,
          { isDraft }
        );
    
        const entry = await strapi.query('donor').update(params, validData);
    
        if (files) {
          // automatically uploads the files based on the entry and the model
          await strapi.entityService.uploadFiles(entry, files, {
            model: 'donor',
            // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
          });
          return this.findOne({ id: entry.id });
        }
    
        return entry;
      },
      countSearch(params) {
        return strapi.query('donor').countSearch(params);
      },
      search(params) {
        return strapi.query('donor').search(params);
      },
      delete(params) {
        return strapi.query('donor').delete(params);
      },
};
