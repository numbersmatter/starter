export type Album = {
  artist: string;
  id: string;
  title: string;
  year: number;
};

let albums: Album[] = [
  {
    artist: "Michael Jackson",
    id: "thriller",
    title: "Thriller",
    year: 1983,
  },
];

export async function getAlbum(albumId: string) {
  return albums.find((album) => album.id === albumId);
}

export async function updateAlbum(albumId: string, values: Partial<Album>) {
  let album = albums.find((album) => album.id === albumId);

  if (album === undefined) {
    return undefined;
  }

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  Object.assign(album, values);
  return album;
}