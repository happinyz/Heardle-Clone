import spotipy
import json
from spotipy.oauth2 import SpotifyClientCredentials
cid = '4730d356901d41b38e8cf1c965c5bbaf'
secret = 'e4044aed94b649fa9d7b8591b3f0ce40'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

tracks = []
id_cache = set()

playlists = [
    '5GhQiRkGuqzpWZSE7OU4Se', # Top hits of 2021
    '2fmTTbBkXi8pewbUvG3CeZ', # Top hits of 2020
    '37i9dQZF1DWVRSukIED0e9', # Top hits of 2019
    '37i9dQZF1DXe2bobNYDtW8', # Top hits of 2018
    '37i9dQZF1DWTE7dVUebpUW', # Top hits of 2017
    '37i9dQZF1DX8XZ6AUo9R4R', # Top hits of 2016
    '37i9dQZF1DX9ukdrXQLJGZ', # Top hits of 2015
    '37i9dQZF1DX0h0QnLkMBl4', # Top hits of 2014
    '37i9dQZF1DX3Sp0P28SIer', # Top hits of 2013
    '37i9dQZF1DX0yEZaMOXna3', # Top hits of 2012
    '37i9dQZF1DXcagnSNtrGuJ', # Top hits of 2011
    '37i9dQZF1DXc6IFF23C9jj', # Top hits of 2010
]

for pl in playlists:
    playlist = sp.playlist(pl)

    for song in playlist["tracks"]["items"]:
        currTrack = song["track"]
        currTrackId = currTrack["id"]
        previewUrl = currTrack["preview_url"]

        if currTrackId in id_cache or not previewUrl:
            continue

        id_cache.add(currTrackId)

        artists = []
        for artist in currTrack["artists"]:
            artist_item = {
                "id": artist["id"],
                "name": artist["name"]
            }
            artists.append(artist_item)

        track_item = {
            "id": currTrackId,
            "title": currTrack["name"],
            "artists": artists,
            "preview_url": previewUrl
        }

        tracks.append(track_item)
    
print(len(tracks))

with open('./songs.json', 'w') as fout:
    json.dump(tracks, fout, indent=4)
