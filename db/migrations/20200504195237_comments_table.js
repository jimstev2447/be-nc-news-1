exports.up = function (knex) {
  /*
  This function will create the 'comments' table. It has the columns 'comment_id' as a primary numerical key, 'author', 'article_id', 'votes', 'created_at', and 'body'.
  */
  console.log(
    "Created the 'comments' table with the columns 'comment_id', 'author', 'article_id', 'votes', 'created_at', and 'body'."
  );

  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author");
    commentsTable
      .foreign("author")
      .references("users.username")
      .onDelete("CASCADE");
    commentsTable.integer("article_id");
    commentsTable
      .foreign("article_id")
      .references("articles.article_id")
      .onDelete("CASCADE");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .timestamp("created_at", { precision: 6 })
      .defaultTo(knex.fn.now(6));
    commentsTable.text("body");
  });
};

exports.down = function (knex) {
  console.log("Deleted the 'comments' table.");
  return knex.schema.dropTable("comments");
};
