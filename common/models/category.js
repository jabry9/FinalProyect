'use strict';

module.exports = function(Category) {

    Category.GetByParentCategory = function(parentCategory, callback) {

        Category.find({where: {parentCategoryId: parentCategory}}, function (err, Ads) {
            if (err)
                callback(err);

            callback(null, Ads);
        });
    }
};
