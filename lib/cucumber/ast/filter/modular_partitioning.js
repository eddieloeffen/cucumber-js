var ModularPartitioningRule = function (numberPartitions, remainder) {
  var Cucumber = require('../../../cucumber');

  var self = {
    isSatisfiedByElement: function isSatisfiedByElement(element) {

      var tags = element.getTags(),
        tagNames = [];

      for (var i = 0; i < tags.length; i++) {
        tagNames.push(tags[i].getName().toLowerCase());
      }

      //If we have the @run-in-series tag on this element, then force it to run in the first partition
      if (tagNames.indexOf("@run-in-series") === 0) {
        return remainder === 0;
      }

      return (element.counter % numberPartitions) == remainder;
    }
  };
  return self;
};
module.exports = ModularPartitioningRule;
