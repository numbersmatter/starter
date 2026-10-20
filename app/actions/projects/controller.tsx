import { createController } from "remix/router";

import { projects } from "../../data/tables.ts";
import { routes } from "../../routes.ts";
import { ProjectListPage } from "./list-page.tsx";
import { ProjectShowPage } from "./show-page.tsx";

export default createController(routes.projects, {
  actions: {
    async index(context) {
      let rows = await context.db.findMany(projects, {
        orderBy: ["created_at", "desc"],
      });
      return context.render(<ProjectListPage projects={rows} />);
    },
    async show(context) {
      let project = await context.db.find(projects, context.params.projectId);

      if (project === null) {
        return new Response("Project not found", { status: 404 });
      }

      return context.render(<ProjectShowPage project={project} />);
    },
  },
});
