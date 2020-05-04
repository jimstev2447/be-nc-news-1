exports.up = function (knex) {
  /*
  This function will create the 'articles' table. It has the columns 'article_id' as a primary numerical key, 'title', 'body', 'votes', 'topic', 'author' and 'created_at'. 
  */
  console.log(
    "Created the 'articles' table with the columns 'article_id', 'title', 'body', 'votes', 'topic', 'author' and 'created_at'."
  );

  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title");
    articlesTable.text("body");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.text("topic");
    articlesTable.foreign("topic").references("topics.slug");
  });
};

exports.down = function (knex) {};
