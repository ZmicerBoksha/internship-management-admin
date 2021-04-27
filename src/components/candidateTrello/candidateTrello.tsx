import {Grid, Typography} from "@material-ui/core";
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import React from "react";
import useAxios from "axios-hooks";
import {PREFIX} from "../../constants";

type CandidateTrelloProps = {
    timeZon: string,
}

const CandidateTrello: React.FC<CandidateTrelloProps> = ({timeZon}) => {

    const [{data, loading, error}, refetch] = useAxios(
        `${PREFIX}employees/${window.location.href.split("/").slice(-1)[0]}`
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <Grid container xs={12} justify="center">
            <Grid item xs={6}>
                <Typography variant="h5" className="subtitle subtitle--notRevived" noWrap>
                    Not reviewed candidates
                </Typography>
                <div><CandidateMiniCard timeZon={timeZon}/></div>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" className="subtitle subtitle--revived" noWrap>
                    Reviewed candidates
                </Typography>
                <div></div>
            </Grid>
        </Grid>
    );
};

export default CandidateTrello;