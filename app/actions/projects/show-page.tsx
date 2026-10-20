import type { Handle } from "remix/component";
import { css } from "remix/component";

import type { Project } from "../../data/tables.ts";
import { Document } from "../document.tsx";
import { routes } from "../../routes.ts";

export function ProjectShowPage(handle: Handle<{ project: Project }>) {
  return () => {
    let { project } = handle.props;
    return (
      <Document title={`${project.name} - Projects`}>
        <main
          mix={css({ maxWidth: "44rem", margin: "0 auto", padding: "4rem 1.5rem" })}
        >
          <p>
            <a href={routes.projects.index.href()}>&larr; All projects</a>
          </p>
          <h1>{project.name}</h1>
          <p mix={css({ color: "#666" })}>Status: {project.status}</p>
          <p>{project.description}</p>
          <p mix={css({ color: "#666", fontSize: "0.85rem" })}>
            Created {new Date(project.created_at).toLocaleString()} · Updated{" "}
            {new Date(project.updated_at).toLocaleString()}
          </p>
        </main>
      </Document>
    );
  };
}
