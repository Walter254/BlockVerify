const ArticleRegister = artifacts.require("ArticleRegister");

module.exports = function (deployer) {
  deployer.deploy(ArticleRegister);
};
