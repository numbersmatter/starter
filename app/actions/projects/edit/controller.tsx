import { createController } from "remix/router";
import * as s from "remix/data-schema";
import { redirect } from "remix/response/redirect";

import { projects } from "../../../data/tables.ts";
import { routes } from "../../../routes.ts";
import { projectFormSchema } from "../schema.ts";
import { ProjectEditPage } from "./page.tsx";

export default createController(routes.projects.edit, {
  actions: {
    async index(context) {
      let project = await context.db.find(projects, context.params.projectId);

      if (project === null) {
        return new Response("Project not found", { status: 404 });
      }

      return context.render(<ProjectEditPage projectId={project.id} values={project} />);
    },
    async action(context) {
      let { projectId } = context.params;
      let project = await context.db.find(projects, projectId);

      if (project === null) {
        return new Response("Project not found", { status: 404 });
      }

      let result = s.parseSafe(projectFormSchema, context.formData);

      if (!result.success || result.value.name.trim() === "") {
        let raw = context.formData;
        let values = {
          name: String(raw.get("name") ?? ""),
          description: String(raw.get("description") ?? ""),
          status: String(raw.get("status") ?? project.status),
        };
        return context.render(
          <ProjectEditPage
            projectId={projectId}
            values={values}
            error="Please provide a name and a valid status."
          />,
          { status: 400 },
        );
      }

      await context.db.update(projects, projectId, {
        name: result.value.name.trim(),
        description: result.value.description,
        status: result.value.status,
        updated_at: Date.now(),
      });

      return redirect(routes.projects.show.href({ projectId }), 303);
    },
  },
});
