var fs = require('fs');
var path = require('path');
var os = require('os');

var startPath = process.argv[2];

var results = [];

var addUpdate = function(fileName) {
    const suffix = fileName.substring(fileName.lastIndexOf('.'));
    console.log('suff: ', suffix);

    if (results[suffix]) {
        results[suffix].ix++;
    } else {
        results[suffix] = { ix: 1 };
    }
};

var walk = function(dir, callback) {
    fs.readdir(dir, function (err, list) {
        var pending = list.length;
        if (!pending) {
            callback();
            return
        }
        list.forEach(function (file) {
            var fileName = path.resolve(dir, file);
            fs.stat(fileName, function (err, stat) {
                if (stat && stat.isDirectory()) {

                    walk(fileName, callback);
                } else {
                    addUpdate(fileName);
                }
            });
        });
    });
    console.log('results: ', JSON.stringify(results));
};

walk(startPath, () => {
    console.log('results: ', JSON.stringify(results));
});

/*
list.forEach(function (file) {
    console.log('file: ', file);
});
*/
