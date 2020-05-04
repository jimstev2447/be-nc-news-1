exports.up = function (knex) {
  /*
  This function will create the 'topics' table
  which is the table in the database that all other
  tables reference and should therefore be created
  first. The requirements for this table are that it should have a 'slug' field which should take unique strings, which function as primary keys and it should also have a 'description' field which takes a string that gives a brief description of a given topic. 
  */
  console.log(
    "Created the 'topics' table which has the columns 'slug' and 'description'."
  );

  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.text("slug").primary();
    topicsTable.text("description");
  });
};

exports.down = function (knex) {
  console.log("Deleted the 'topics' table.");
};
