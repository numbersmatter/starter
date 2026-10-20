import type { Handle } from "remix/component";
import { css } from "remix/component";

import { Document } from "../document.tsx";
import type { Album } from "./data.ts";

export function AlbumPage(handle: Handle<{ album: Album }>) {
  return () => {
    let { album } = handle.props;
    return (
      <Document title={`${album.title} - Albums`}>
        <main
          mix={css({
            maxWidth: "44rem",
            margin: "0 auto",
            padding: "4rem 1.5rem",
          })}
        >
          <p mix={css({ color: "#666"})}>
            {album.artist}  ({album.year})
          </p>
          <h1>{album.title}</h1>
        </main>
      </Document>
    );
  };
}