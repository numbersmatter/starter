import { clientEntry, css, on } from "remix/component";
import type { Handle } from "remix/component";

import { routes } from "../../../../routes.ts";

interface Album {
  artist: string;
  id: string;
  title: string;
  year: number;
}

export const AlbumEditForm = clientEntry(
  import.meta.url,
  function AlbumEditForm(handle: Handle<{ album: Album }>) {
    let pending = false;

    return () => {
      let { album } = handle.props;

      return (
        <form
          action={routes.albums.edit.action.href({ albumId: album.id })}
          method="post"
          mix={[
            css({
            display: "grid",
            gap: "0.75rem",
            maxWidth: "fit-content",
            "& input": {
              marginLeft: "0.5rem",
            },
          }),
          on("submit", ()=>{
            pending = true;
            handle.update();
          })
        ]}
        >
          <label>
            Title
            <input name="title" defaultValue={album.title} required />
          </label>
          <label>
            Artist
            <input name="artist" defaultValue={album.artist} required />
          </label>
          <label>
            Year
            <input name="year" defaultValue={album.year} required type="number" />
          </label>
           {/* ... */}
          <button disabled={pending} type="submit">
            {pending ? "Saving…" : "Save album"}
          </button>
        </form>
      );
    };
  }
);