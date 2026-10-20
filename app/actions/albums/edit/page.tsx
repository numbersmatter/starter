import { css } from "remix/component";
import type { Handle } from "remix/component";

import { AlbumEditForm } from "./public/album-edit-form.tsx";
import { Document } from "../../document.tsx";
import type { Album } from "../data.ts";

export function AlbumEditPage(handle: Handle<{ album: Album }>) {
  return () => {
    let { album } = handle.props;

    return (
      <Document title={`Edit ${album.title} — Albums`}>
        <main mix={css({ padding: "1rem" })}>
          <h1>Edit {album.title}</h1>
          <AlbumEditForm album={ album } />
        </main>
      </Document>
    );
  };
}