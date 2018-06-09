module.exports = function(app) {
  app.dataSources.files.connector.getFilename = function(uploadingFile, req, res) {
    return Math.random().toString().substr(2) + '.jpg';
  };
};