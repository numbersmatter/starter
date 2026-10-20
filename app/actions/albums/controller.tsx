import { createController } from "remix/router";

import { routes } from "../../routes.ts";
import { getAlbum } from "./data.ts";
import { AlbumPage } from "./show-page.tsx";

export default createController(routes.albums, {
  actions: {
    async show(context) {
      let album = await getAlbum(context.params.albumId);

      if (album === undefined) {
        return new Response("Album not found", { status: 404 });
      }
      
      return context.render(<AlbumPage album ={album} />);
    },
  },
});