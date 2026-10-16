export function albumPhotos<T extends {album_id: string; published?: boolean}>(photos: T[], albumId: string, publicOnly = false): T[] {
  return photos.filter(photo => photo.album_id === albumId && (!publicOnly || photo.published === true));
}

export function visibleAlbums<T extends {id: string; published: boolean}>(albums: T[], photos: {album_id: string; published?: boolean}[]): T[] {
  return albums.filter(album => album.published && albumPhotos(photos, album.id, true).length > 0);
}