export type SpotifyAlbumResult = {
  spotifyId: string;
  name: string;
  photo: string;
  yearReleased: number;
  totalTracks: number;
  artistName: string;
};

export type SpotifyArtistResult = {
  spotifyId: string;
  name: string;
  photo: string;
  genres: string[];
};
