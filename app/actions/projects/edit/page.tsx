import type { Handle } from "remix/component";
import { css } from "remix/component";

import { Document } from "../../document.tsx";
import { routes } from "../../../routes.ts";
import { ProjectForm, type ProjectFormValues } from "../form.tsx";

export function ProjectEditPage(
  handle: Handle<{ projectId: string; values: ProjectFormValues; error?: string }>,
) {
  return () => {
    let { projectId, values, error } = handle.props;
    return (
      <Document title="Edit project">
        <main mix={css({ maxWidth: "44rem", margin: "0 auto", padding: "4rem 1.5rem" })}>
          <p>
            <a href={routes.projects.show.href({ projectId })}>&larr; Back to project</a>
          </p>
          <h1>Edit project</h1>
          <ProjectForm values={values} submitLabel="Save changes" error={error} />
        </main>
      </Document>
    );
  };
}
