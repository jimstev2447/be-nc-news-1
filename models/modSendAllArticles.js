const knex = require("../db/data/connection.js");

const modSendAllArticles = () => {
  return knex("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy("created_at", "desc")
    .then((articles) => {
      return articles;
    });
};

const getAllArticles = async (query) => {
  const { sort_by, order, author, topic } = query;

  const dataOrder = order ? order : "desc";
  const dataSort = sort_by ? sort_by : "created_at";

  const authors = await knex("users").select("users.username");
  const topics = await knex("topics").select("topics.slug");

  // Get all author names
  const authorNames = authors.map((author) => {
    return author.username;
  });

  // Get all topic slugs
  const topicSlugs = topics.map((topic) => {
    return topic.slug;
  });

  if (author && !authorNames.includes(author)) {
    throw new Error("NOT_FOUND");
  }

  if (topic && !topicSlugs.includes(topic)) {
    throw new Error("NOT_FOUND");
  }

  const sql = knex("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count({ comment_count: "comments.article_id" })
    .groupBy("articles.article_id")
    .orderBy(dataSort, dataOrder);

  if (author) {
    sql.where("articles.author", "=", `${author}`);
  }

  if (topic) {
    sql.where("articles.topic", "=", `${topic}`);
  }

  sql.then((articles) => {
    return articles;
  });

  return sql;
};

module.exports = getAllArticles;
