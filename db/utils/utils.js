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

exports.formatComments = (comments, articleRef) => {
  let commentsCopy = comments.map((obj) => ({ ...obj }));
  commentsCopy.forEach((comment) => {
    comment["created_at"] = new Date(comment["created_at"]);
    comment["article_id"] = articleRef[comment["belongs_to"]];
    comment["author"] = comment["created_by"];
    delete comment["created_by"];
    delete comment["belongs_to"];
  });
  return commentsCopy;
};
