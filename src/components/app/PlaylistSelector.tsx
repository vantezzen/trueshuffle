import useSpotifyData from "@/lib/hooks/useSpotifyData";
import { Loading, Card, Input, Text } from "@geist-ui/core";
import React from "react";
import { usePlayerState } from "./player/playerState";

function PlaylistSelector() {
  const setPlaylist = usePlayerState((state) => state.setPlaylist);
  const playlists = useSpotifyData(
    (spotify) => spotify.getUserPlaylists(),
    (data) => data.items
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const isFetching = usePlayerState((state) => state.isFetching);

  const searchedPlaylists = useSpotifyData(
    (spotify) => spotify.searchPlaylists(searchQuery),
    (data) => data.playlists?.items,
    {
      dependencies: [searchQuery],
      skip: !searchQuery,
    }
  );

  const filteredPlaylists = searchQuery ? searchedPlaylists : playlists;

  return (
    <div className="relative">
      {isFetching && (
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-100 bg-opacity-50 p-12 flex flex-col items-center">
          <Loading height="auto" />
          <Text className="mt-6">Loading...</Text>
        </div>
      )}

      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        width="100%"
        className="my-6"
        placeholder="Search"
      />

      {playlists === null && <Loading />}

      <div className="flex flex-col gap-6">
        {filteredPlaylists?.map((playlist) => (
          <button
            key={playlist.id}
            className="text-left"
            onClick={() => setPlaylist(playlist)}
          >
            <Card>
              <Text b>{playlist.name}</Text>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlaylistSelector;
