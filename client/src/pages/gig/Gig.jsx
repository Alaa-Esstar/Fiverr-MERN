import React, { useState, useEffect } from "react";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
    const { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`).then((res) => {
                return res.data;
            }),
    });

    const userId = data?.userId;

    const {
        isLoading: isLoadingUser,
        error: errorUser,
        data: dataUser,
    } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            newRequest.get(`/users/${userId}`).then((res) => {
                return res.data;
            }),
        enabled: !!userId,
    });

    const images = data?.images;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const handleNext = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setFade(false);
        }, 300); // 500ms is the duration of the fade transition
    };
    const handlePrev = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setFade(false);
        }, 300); // 500ms is the duration of the fade transition
    };
    useEffect(() => {
        // Reset the fade effect when the image changes
        setFade(false);
    }, [currentIndex]);

    return (
        <div className="gig">
            {isLoading ? "Loaading" : error ? "something went wrong" :
                <div className="container">
                    <div className="left">
                        <span className="breadcrumbs">fiverr - Graphics & Design -</span>
                        <h1>{data.title}</h1>
                        {isLoadingUser ? "loading" : error ? "something went wrong!" :
                            <div className="user">
                                <img
                                    className="pp"
                                    src={dataUser.img || "/img/noavatar.jpg"}
                                    alt=""
                                />
                                <span>{dataUser.username}</span>
                                {!isNaN(data.totalStars / data.starNumber) &&
                                    <div className="stars">
                                        {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                                            <img src="/img/star.png" alt="" key={i} />
                                        ))}
                                        <span> {Math.round(data.totalStars / data.starNumber)}</span>
                                    </div>
                                }
                            </div>
                        }
                        <div className="carousel">
                            <img
                                className={`carousel-image ${fade && "fade-out"}`}
                                src={images[currentIndex]}
                                alt={`Image ${currentIndex}`}
                            />
                            <button className="carousel-button prev" onClick={handlePrev}>
                                &#8249;
                            </button>
                            <button className="carousel-button next" onClick={handleNext}>
                                &#8250;
                            </button>
                        </div>
                        <h2>About This Gig</h2>
                        <p>{data.desc}</p>
                        {isLoadingUser ? "loading" : error ? "something went wrong!" :
                            <div className="seller">
                                <h2>About The Seller</h2>
                                <div className="user">
                                    <img
                                        src={dataUser.img || "/img/noavatar.jpg"}
                                        alt=""
                                    />
                                    <div className="info">
                                        <span>{dataUser.username}</span>
                                        {!isNaN(data.totalStars / data.starNumber) &&
                                            <div className="stars">
                                                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                                                    <img src="/img/star.png" alt="" key={i} />
                                                ))}
                                                <span> {Math.round(data.totalStars / data.starNumber)}</span>
                                            </div>
                                        }
                                        <button>Contact Me</button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="items">
                                        <div className="item">
                                            <span className="title">From</span>
                                            <span className="desc">{dataUser.country}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Member since</span>
                                            <span className="desc">Aug 2022</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Avg. response time</span>
                                            <span className="desc">4 hours</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Last delivery</span>
                                            <span className="desc">1 day</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Languages</span>
                                            <span className="desc">English</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>
                                        {dataUser.desc}
                                    </p>
                                </div>
                            </div>
                        }
                        <Reviews gigId={id} />
                    </div>
                    <div className="right">
                        <div className="price">
                            <h3>{data.shortTitle}</h3>
                            <h2>$ {data.price}</h2>
                        </div>
                        <p>{data.shortDesc}</p>
                        <div className="details">
                            <div className="item">
                                <img src="/img/clock.png" alt="" />
                                <span>{data.deliveryDate} Days Delivery</span>
                            </div>
                            <div className="item">
                                <img src="/img/recycle.png" alt="" />
                                <span>{data.revisionNumber} Revisions</span>
                            </div>
                        </div>
                        <div className="features">
                            {data.features.map((feature) => {
                                <div className="item" key={feature}>
                                    <img src="/img/greencheck.png" alt="" />
                                    <span>{feature}</span>
                                </div>
                            })}
                        </div>
                        <button>Continue</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Gig;