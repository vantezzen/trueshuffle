import useSpotifyData from "@/lib/hooks/useSpotifyData";
import { Loading, Card, Input, Text, Badge } from "@geist-ui/core";
import React from "react";
import { LoadingState, usePlayerState } from "@/lib/player/playerState";
import { useDebounce } from "use-debounce";
import useSpotifyUser from "@/lib/hooks/useSpotifyUser";

function PlaylistSelector() {
  const player = usePlayerState((state) => state.player);
  const loadingState = usePlayerState((state) => state.loadingState);

  const playlists = useSpotifyData(
    (spotify) => spotify.getUserPlaylists(),
    (data) => data.items
  );
  const spotifyUser = useSpotifyUser();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const searchedPlaylists = useSpotifyData(
    (spotify) => {
      return spotify.searchPlaylists(debouncedSearchQuery);
    },
    (data) => data.playlists?.items,
    {
      dependencies: [debouncedSearchQuery],
      skip: !debouncedSearchQuery,
    }
  );

  const filteredPlaylists = searchQuery ? searchedPlaylists : playlists;

  return (
    <div className="relative">
      {loadingState !== LoadingState.notLoading && (
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

      <div className="flex flex-col gap-4">
        {filteredPlaylists?.map((playlist) => (
          <button
            key={playlist.id}
            className="text-left"
            onClick={() => player?.handlePlaylistSelect(playlist)}
          >
            <Card>
              <div className="flex gap-4">
                <Text b>{playlist.name}</Text>
                {playlist.owner.id !== spotifyUser?.id && (
                  <Badge>
                    <span className="text-xs font-medium px-2">
                      by {playlist.owner.display_name}
                    </span>
                  </Badge>
                )}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlaylistSelector;
