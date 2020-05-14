const knex = require("../db/data/connection.js");

const sendAllArticles = async (query) => {
  const { sort_by, order, author, topic } = query;

  const dataOrder = order ? order : "desc";
  const dataSort =
    sort_by === "title" || sort_by === "author" || sort_by === "topic"
      ? sort_by
      : "created_at";

  const authors = await knex("users").select("users.username");
  const topics = await knex("topics").select("topics.slug");
  const authorNames = authors.map((author) => {
    return author.username;
  });

  const topicSlugs = topics.map((topic) => {
    return topic.slug;
  });

  if (author && !authorNames.includes(author)) {
    return Promise.reject({ status: 404, message: "author not found" });
  }

  if (topic && !topicSlugs.includes(topic)) {
    return Promise.reject({ status: 404, message: "topic not found" });
  }

  const articlesQuery = knex("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy(dataSort, dataOrder);

  if (author) {
    articlesQuery.where("articles.author", "=", `${author}`);
  }

  if (topic) {
    articlesQuery.where("articles.topic", "=", `${topic}`);
  }

  articlesQuery.then((articles) => {
    return articles;
  });

  return articlesQuery;
};

module.exports = sendAllArticles;
