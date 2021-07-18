import React, { useEffect, useState } from "react";
import { getDefault, getSearch } from "./service";

const Home = () => {
    const [search, setsearch] = useState("");
    const [imageArray, setImageArray] = useState([]);
    const [showModal, setshowModal] = useState({ flag: false, src: null });
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (search === "") {
            setloading(true)
            getDefault(handleResponse);
        }
        if (search && search.length > 2) {
            setloading(true)
            getSearch(handleResponse, search);
        }
    }, [search]);

    const handleResponse = (data) => {
        let picArray = data.data.photos.photo.map((pic) => {
            return `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
        });
        setImageArray(picArray);
        let oldSearch = localStorage.getItem("pastSearches");
        let newSearch = oldSearch + " " + search;
        localStorage.setItem("pastSearches", newSearch);
        setloading(false)
    };

    const handleSearch = (e) => {
        setsearch(e.target.value);
    };

    return (
        <>
            {loading && (
                <div id="myModal" className="modal">
                    <div id="caption">
                        <h1>Loading . . .</h1>
                    </div>
                    <div id="caption"></div>
                </div>
            )}
            <div className="header">
                <span className="header-title">Search Photos</span>
                <br />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search here"
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                />
            </div>
            {imageArray &&
                imageArray?.length > 0 &&
                imageArray.map((i, index) => (
                    <img
                        src={i}
                        alt="fdf"
                        className="img"
                        key={index}
                        onClick={() => setshowModal({ flag: true, src: i })}
                    />
                ))}
            {showModal.flag && (
                <div id="myModal" className="modal">
                    <span className="close" onClick={() => setshowModal({ flag: false, src: null })}>
                        &times;
                    </span>
                    <div id="caption">
                        <img src={showModal.src} alt="fdf" className="modal-img" />
                    </div>
                    <div id="caption"></div>
                </div>
            )}
        </>
    );
};

export default Home;
