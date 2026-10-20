import { createController } from "remix/router";
import { redirect } from "remix/response/redirect";

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
    async destroy(context) {
      let project = await context.db.find(projects, context.params.projectId);

      if (project === null) {
        return new Response("Project not found", { status: 404 });
      }

      await context.db.delete(projects, project.id);
      return redirect(routes.projects.index.href(), 303);
    },
  },
});
