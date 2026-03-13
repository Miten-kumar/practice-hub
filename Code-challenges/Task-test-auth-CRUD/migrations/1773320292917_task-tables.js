export const up = (pgm) => {
  pgm.createTable("tasks", {
    task_id: { type: "integer", primaryKey: true },
    name: { type: "text" },
  });
};

export const down = (pgm) => {
  pgm.dropTable("tasks");

};
