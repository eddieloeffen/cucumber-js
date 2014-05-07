var ModularPartitioningRule = function (numberPartitions, remainder) {
    var Cucumber = require('../../../cucumber');
    var path = require('path');

    var self = {

        hashString: function (str) {
            var hash = 0, i, ch;
            if (str.length == 0) return hash;
            for (i = 0; i < str.length; i++) {
                ch = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + ch;
                hash = hash & hash; // Convert to 32bit integer
            }

            return hash.toString();
        },

        choosePartitionForSeries: function (element) {
            var filePath = element.getUri(),
                normalised = path.basename(filePath).toLowerCase(),
                hashOfPath = self.hashString(normalised);

            return hashOfPath % numberPartitions;
        },

        isSatisfiedByElement: function isSatisfiedByElement(element) {

            var tags = element.getTags(),
                tagNames = [];

            for (var i = 0; i < tags.length; i++) {
                tagNames.push(tags[i].getName().toLowerCase());
            }

            //If we have the @run-in-series tag on this element, then force it to run in one of the partition
            // Which partition it runs in is determined by the file path.
            // This means that @run-in-series scenarios are guaranteed to run together if they are in the same file
            if (tagNames.indexOf("@run-in-series") === 0) {
                return self.choosePartitionForSeries(element) === remainder;
            }

            return (element.counter % numberPartitions) == remainder;
        }
    };
    return self;
};
module.exports = ModularPartitioningRule;
