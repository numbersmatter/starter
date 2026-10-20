import { column as c, table } from "remix/data-table";
import type { TableRow } from "remix/data-table";

export const projectStatuses = ["planned", "active", "done"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const projects = table({
  name: "projects",
  columns: {
    id: c.text(),
    name: c.text(),
    description: c.text(),
    status: c.text(),
    created_at: c.integer(),
    updated_at: c.integer(),
  },
});

export type Project = TableRow<typeof projects>;
