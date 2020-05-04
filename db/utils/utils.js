exports.formatDates = (list) => {};

exports.makeRefObj = (list) => {
  let refObj = {};
  list.forEach((article) => (refObj[article.title] = article.article_id));
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
