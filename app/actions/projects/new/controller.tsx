import { createController } from "remix/router";
import * as s from "remix/data-schema";
import { redirect } from "remix/response/redirect";

import { projects } from "../../../data/tables.ts";
import { routes } from "../../../routes.ts";
import { projectFormSchema } from "../schema.ts";
import { ProjectNewPage } from "./page.tsx";

const emptyValues = { name: "", description: "", status: "planned" };

export default createController(routes.projects.new, {
  actions: {
    index(context) {
      return context.render(<ProjectNewPage values={emptyValues} />);
    },
    async action(context) {
      let result = s.parseSafe(projectFormSchema, context.formData);

      if (!result.success || result.value.name.trim() === "") {
        let raw = context.formData;
        let values = {
          name: String(raw.get("name") ?? ""),
          description: String(raw.get("description") ?? ""),
          status: String(raw.get("status") ?? "planned"),
        };
        return context.render(
          <ProjectNewPage values={values} error="Please provide a name and a valid status." />,
          { status: 400 },
        );
      }

      let now = Date.now();
      let id = crypto.randomUUID();
      await context.db.create(projects, {
        id,
        name: result.value.name.trim(),
        description: result.value.description,
        status: result.value.status,
        created_at: now,
        updated_at: now,
      });

      return redirect(routes.projects.show.href({ projectId: id }), 303);
    },
  },
});
