const { isDraft } = require('strapi-utils').contentTypes;

module.exports = {
  /**
   * Promise to add record
   *
   * @return {Promise}
   */

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
};