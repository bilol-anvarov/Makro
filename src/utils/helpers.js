export const getOffset = (page, limit) => {
  return page && page > 1 ? (page - 1) * (limit || 7) : undefined;
};

export const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: "slick-dots slick-thumb",
  arrows: false,
};
