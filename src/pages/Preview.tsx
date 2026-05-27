import { useEffect, useState } from "react";
import "../App.css";

function Preview() {
    const [data, setData] = useState<any>(null);

    const API_KEY =
        "4518dd6f0831862d508f88c8a47045536659a0a67ac1fed01d93640071227b89";

    const ENDPOINT = "https://serpapi.com/search";

    const params = {
        engine: "google_play_games",
        q: "clash royale",
        hl: "en",
        gl: "us",
    };

    useEffect(() => {
        const queryString = new URLSearchParams({
            ...params,
            api_key: API_KEY,
        }).toString();

        const url = `${ENDPOINT}?${queryString}`;

        fetch("https://corsproxy.io/?" + encodeURIComponent(url))
            .then((res) => res.json())
            .then((result) => setData(result))
            .catch(() => setData("error"));
    }, []);

    if (!data) return <div className="loading">Loading...</div>;

    if (data === "error")
        return <div className="error">Failed to load</div>;

    const app = data?.app_highlight;

    return (
        <div className="container">
            <div className="card">

                <div className="banner">
                    <img
                        src={app.images?.[0]}
                        alt="banner"
                    />
                </div>

                <div className="top-section">

                    <img
                        src={app.thumbnail}
                        className="thumbnail"
                        alt={app.title}
                    />

                    <div className="header">

                        <h1 className="title">
                            {app.title}
                        </h1>

                        <p className="author">
                            {app.author}
                        </p>

                        <p className="description">
                            {app.description}
                        </p>

                        <div className="stats">

                            <div className="stat-box">
                                <span>⭐ Rating</span>
                                <b>{app.rating}</b>
                            </div>

                            <div className="stat-box">
                                <span>💬 Reviews</span>
                                <b>
                                    {Number(app.reviews).toLocaleString()}
                                </b>
                            </div>

                            <div className="stat-box">
                                <span>📥 Downloads</span>
                                <b>{app.downloads}</b>
                            </div>

                            <div className="stat-box">
                                <span>🧒 Age</span>
                                <b>{app.content_rating?.text}</b>
                            </div>

                        </div>

                        <a
                            href={app.link}
                            target="_blank"
                            rel="noreferrer"
                            className="install-button"
                        >
                            Install Now
                        </a>

                    </div>
                </div>

                <div className="video-wrapper">
                    <iframe
                        className="video"
                        src={app.video}
                        allowFullScreen
                        title="game-video"
                    />
                </div>

                <h2 className="section-title">
                    Screenshots
                </h2>

                <div className="image-row">
                    {app.images
                        ?.slice(0, 10)
                        .map((img: string, i: number) => (
                            <img
                                key={i}
                                src={img}
                                className="preview-image"
                                alt={`preview-${i}`}
                            />
                        ))}
                </div>

            </div>
        </div>
    );
}

export default Preview;