import type { Handle } from "remix/component";
import { css } from "remix/component";

import { Document } from "../../document.tsx";
import { routes } from "../../../routes.ts";
import { ProjectForm, type ProjectFormValues } from "../form.tsx";

export function ProjectNewPage(handle: Handle<{ values: ProjectFormValues; error?: string }>) {
  return () => {
    let { values, error } = handle.props;
    return (
      <Document title="New project">
        <main mix={css({ maxWidth: "44rem", margin: "0 auto", padding: "4rem 1.5rem" })}>
          <p>
            <a href={routes.projects.index.href()}>&larr; All projects</a>
          </p>
          <h1>New project</h1>
          <ProjectForm values={values} submitLabel="Create project" error={error} />
        </main>
      </Document>
    );
  };
}
