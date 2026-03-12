export const up = (pgm) => {
  pgm.createTable("users", {
    users_id: { type: "integer", primaryKey: true },
    email: { type: "text" },
    first_name: { type: "text" },
    last_name: { type: "text" },
    phone_number : { type: "text" },
    age :{type:"integer"},
    gender: {type:"text"},
    password: { type: "text" }

  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
};
