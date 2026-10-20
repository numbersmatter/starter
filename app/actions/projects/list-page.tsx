import type { Handle } from "remix/component";
import { css } from "remix/component";

import type { Project } from "../../data/tables.ts";
import { Document } from "../document.tsx";
import { routes } from "../../routes.ts";

export function ProjectListPage(handle: Handle<{ projects: Project[] }>) {
  return () => {
    let { projects } = handle.props;
    return (
      <Document title="Projects">
        <main
          mix={css({ maxWidth: "44rem", margin: "0 auto", padding: "4rem 1.5rem" })}
        >
          <h1>Projects</h1>
          {projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <a href={routes.projects.show.href({ projectId: project.id })}>
                    {project.name}
                  </a>{" "}
                  <small>({project.status})</small>
                </li>
              ))}
            </ul>
          )}
        </main>
      </Document>
    );
  };
}
