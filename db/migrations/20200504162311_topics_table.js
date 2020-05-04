exports.up = function (knex) {
  /*
  This function will create the 'topics' table
  which is the table in the database that all other
  tables reference. It has the columns 'slug' as a primary key and 'description.' 
  */
  console.log(
    "Created the 'topics' table with the columns 'slug' and 'description'."
  );

  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.text("slug").primary();
    topicsTable.text("description");
  });
};

exports.down = function (knex) {
  console.log("Deleted the 'topics' table.");
  return knex.schema.dropTable("topics");
};
