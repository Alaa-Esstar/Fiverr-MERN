// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import "./Slide.scss"

// import required modules
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import CatCard from '../catCard/CatCard';
import { cards } from "../../data"

const Slide = ({ children }) => {
    return (
        <div className='slide'>
            <div className="container">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    grabCursor={true}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[FreeMode, Navigation, Pagination]}
                    className="mySwiper"
                >
                    {children}
                </Swiper>
            </div>
        </div>
    )
}

export default Slide