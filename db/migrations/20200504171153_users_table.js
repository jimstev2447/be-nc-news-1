exports.up = function (knex) {
  /*
  This function will create the 'users' table. It has the columns 'username' as a primary key, 'avatar_url' and 'name'. 
  */
  console.log(
    "Created the 'users' table with the columns 'username', 'avatar_url' and 'name'."
  );

  return knex.schema.createTable("users", (usersTable) => {
    usersTable.text("username").primary();
    usersTable.text("avatar_url");
    usersTable.text("name");
  });
};

exports.down = function (knex) {
  console.log("Deleted the 'users' table.");
  return knex.schema.dropTable("users");
};
