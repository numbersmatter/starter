import * as s from "remix/data-schema";
import * as f from "remix/data-schema/form-data";

import { projectStatuses } from "../../data/tables.ts";

export const projectFormSchema = f.object({
  name: f.field(s.string()),
  description: f.field(s.defaulted(s.string(), "")),
  status: f.field(s.enum_(projectStatuses)),
});
