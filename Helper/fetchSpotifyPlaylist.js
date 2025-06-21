import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

let tokenReady = false;

const ensureToken = async () => {
  if (tokenReady) return;
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
  tokenReady = true;
};

export const getSpotifyTrackLinks = async (playlistUrl) => {
  await ensureToken();

  const playlistId = playlistUrl.split('/playlist/')[1]?.split('?')[0];
  if (!playlistId) throw new Error('Không lấy được ID playlist.');

  const result = await spotifyApi.getPlaylistTracks(playlistId, { limit: 100 });
  const tracks = result.body.items;

  const links = tracks.map(item => item.track?.external_urls?.spotify).filter(Boolean);

  console.log(`[Spotify Web API] Track links:`, links);

  return links;
};