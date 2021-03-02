import React from "react";
import "./Loader.css";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loader(props) {
    const {loading} = props;
    return (
        <>
            {loading && (
                <div className="loaderWrapper">
                    <CircularProgress/>
                </div>
            )}
        </>
    );
}
export default Loader;
