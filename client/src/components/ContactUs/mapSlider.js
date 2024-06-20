import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import rightArr from '../../assets/homeImg/right.png'
import cx from 'classnames'

const MapSlider = () => {
    const SampleNextArrow = ({ onClick, currentSlide, slideCount }) => {
        const isLastSlide = currentSlide === slideCount - 1

        return (
            <div
                className={cx('next-arrow ', {
                    'opacity-40   ': isLastSlide,
                    'cursor-pointer ': !isLastSlide,
                })}
                onClick={isLastSlide ? null : onClick}
                style={{ background: { rightArr } }}
            >
                <img
                    className="absolute top-[40%] -right-[60px] z-10 w-9 sm:w-max"
                    src={rightArr}
                    alt="right"
                />
            </div>
        )
    }

    const SamplePrevArrow = ({ onClick, currentSlide }) => {
        const isFirstSlide = currentSlide === 0

        return (
            <div
                className={cx('prev-arrow ', {
                    'opacity-40  ': isFirstSlide,
                    'cursor-pointer ': !isFirstSlide,
                })}
                onClick={isFirstSlide ? null : onClick}
                style={{ background: { rightArr } }}
            >
                <img
                    className="absolute 
                     top-[40%] -left-[60px] z-10 w-9 sm:w-max rotate-180 disabled:opacity-50"
                    src={rightArr}
                    alt="left"
                />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

        responsive: [
            {
                breakpoint: 2570,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: true,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 1000,
                    arrows: false,
                },
            },
        ],
        appendDots: (dots) => (
            <div className=" bg-[#00000000] rounded-none">
                <ul className="sm:m-0 sm:p-0"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="slick-dot origin-center bg-[#511b3f] border-y-0 border-[#511b3f] h-1 min-w-[14px] w-auto rounded-sm">
                {''}
            </div>
        ),
    }

    const maps = [
        {
            mapLink:
                'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124443.05091922583!2d77.4335597!3d12.91766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15fa4c674069%3A0xd3144b5bbbc578e5!2sKoza%20Aesthetic%20Care%20-%20Jayanagar!5e0!3m2!1sen!2sin!4v1718724388043!5m2!1sen!2sin',
        },
        {
            mapLink: '',
        },
        {
            mapLink: '',
        },
        {
            mapLink: '',
        },
        {
            mapLink: '',
        },
    ]

    return (
        <div className="bg-testBG py-4 ">
            <div>
                <div className="text-center overflow-hidden w-[90%] xl:w-[52%] mx-auto">
                    <p className="text-[30px] lg:text-4xl font-semibold text-[#35023F] ">
                        Our Locations
                    </p>
                </div>

                <div className="my-0 px-2 sm:px-20 py-0 min-h-full ">
                    <Slider {...settings}>
                        {maps?.map(({ mapLink }, index) => (
                            <div
                                className="py-5 lg:px-3 flex"
                                key={index}
                            >
                                {mapLink && (
                                    <div className="bg-[#fff] rounded-lg w-full h-full sm:h-[400px]">
                                        <iframe
                                            src={mapLink}
                                            width="1000"
                                            height="500"
                                            // style={{ border: 0 }}
                                            // allowFullScreen
                                            loading="lazy"
                                            title={`Map ${index}`}
                                            // referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-full"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default MapSlider
