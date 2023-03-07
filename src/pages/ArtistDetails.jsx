import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
} from "../redux/services/sharamCore";

const ArtistDetails = () => {
    const dispatch = useDispatch();

    const { isPlaying, activeSong } = useSelector((state) => state.player);

    const { data: songData, isFetching: isFetchingSongDetail } =
        useGetSongDetailsQuery(626708777);

    const {
        data,
        isFetching: isFetchingSongRelated,
        error,
    } = useGetSongRelatedQuery(626708777);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    if (isFetchingSongDetail || isFetchingSongRelated)
        return <Loader title={"Searching lyrics..."} />;

    if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />

            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default ArtistDetails;
