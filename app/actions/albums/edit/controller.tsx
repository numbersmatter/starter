import { createController } from "remix/router";
import * as s from "remix/data-schema";
import * as f from "remix/data-schema/form-data";
import * as coerce from "remix/data-schema/coerce";
import { redirect } from "remix/response/redirect";

import { routes } from "../../../routes.ts";
import { getAlbum, updateAlbum } from "../data.ts";
import { AlbumEditPage } from "./page.tsx";

const albumFormSchema = f.object({
  artist: f.field(s.string()),
  title: f.field(s.string()),
  year: f.field(coerce.number()),
});

export default createController(routes.albums.edit, {
  actions: {
    async index(context) {
      let album = await getAlbum(context.params.albumId);

      if (album === undefined) {
        return new Response("Album not found", { status: 404 });
      }

      return context.render(<AlbumEditPage album={album} />);
    },
    async action({ formData, params }) {
      let result = s.parseSafe(albumFormSchema, formData);

      if (!result.success) {
        return new Response("Invalid album data", { status: 400 });
      }

      let album = await updateAlbum(params.albumId, result.value);

      if (album === undefined) {
        return new Response("Album not found", { status: 404 });
      }

      return redirect(routes.albums.show.href({ albumId: album.id }), 303);
    },
  },
});