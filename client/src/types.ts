export interface SongGuess {
  title?: string;
  artist?: string;
  skipped?: boolean;
}

export interface Song {
  id: string;
  title: string;
  artists: Artist[];
  preview_url: string;
}

export interface Artist {
  name: string;
  id: string;
}

export interface DisplayedSong {
  title: string;
  id: string;
}
