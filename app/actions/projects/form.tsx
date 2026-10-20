import type { Handle } from "remix/component";
import { css } from "remix/component";

import { projectStatuses } from "../../data/tables.ts";

export type ProjectFormValues = {
  name: string;
  description: string;
  status: string;
};

export function ProjectForm(
  handle: Handle<{ values: ProjectFormValues; submitLabel: string; error?: string }>,
) {
  return () => {
    let { values, submitLabel, error } = handle.props;
    return (
      <form
        method="post"
        mix={css({ display: "grid", gap: "1rem", maxWidth: "32rem" })}
      >
        {error ? <p role="alert">{error}</p> : null}
        <label>
          Name
          <input type="text" name="name" required value={values.name} />
        </label>
        <label>
          Description
          <textarea name="description" rows={4} value={values.description} />
        </label>
        <label>
          Status
          <select name="status">
            {projectStatuses.map((status) => (
              <option key={status} value={status} selected={status === values.status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{submitLabel}</button>
      </form>
    );
  };
}
