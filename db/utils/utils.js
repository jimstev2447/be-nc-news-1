exports.formatDates = (list) => {
  let listCopy = list.map((obj) => ({ ...obj }));
  listCopy.forEach(
    (article) => (article["created_at"] = new Date(article["created_at"]))
  );
  return listCopy;
};

exports.makeRefObj = (list) => {
  let refObj = {};
  list.forEach((article) => (refObj[article.title] = article.article_id));
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
