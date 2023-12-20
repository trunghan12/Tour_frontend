import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinity: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinity: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Theo ông Minh Khang - Giám đốc Công ty du lịch Tugo cho biết: “Chúng
          tôi luôn trân trọng từng nhận xét chân thành của khách hàng về dịch vụ
          của công ty. Mỗi góp ý của khách hàng là động lực thúc đẩy công ty
          chúng tôi không ngừng cải thiện dịch vụ và chất lượng tour du lịch
          trong và ngoài nước”.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Minh Khang</h6>
            <p>Khách Hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Khách hàng Tuyết Anh Nguyễn chia sẻ: “Tuy tour du lịch của Tugo rất
          tốt và hướng dẫn viên rất tận tâm với khách nhưng việc cung cấp thông
          tin và tư vấn tour du lịch của công ty khi tôi đặt tour vẫn chưa nhanh
          và đầy đủ khiến tôi cảm thấy vẫn chưa hài lòng dịch vụ của công ty”.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Tuyết Anh</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Theo ông Ngọc Mỹ - Giám đốc Công ty du lịch Tugo cho biết: “Chúng tôi
          luôn trân trọng từng nhận xét chân thành của khách hàng về dịch vụ của
          công ty. Mỗi góp ý của khách hàng là động lực thúc đẩy công ty chúng
          tôi không ngừng cải thiện dịch vụ và chất lượng tour du lịch trong và
          ngoài nước”.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Ngọc Mỹ</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Khách hàng Hãy Yến Trương chia sẻ: “Tuy tour du lịch của Tugo rất tốt
          và hướng dẫn viên rất tận tâm với khách nhưng việc cung cấp thông tin
          và tư vấn tour du lịch của công ty khi tôi đặt tour vẫn chưa nhanh và
          đầy đủ khiến tôi cảm thấy vẫn chưa hài lòng dịch vụ của công ty”.
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
          <div>
            <h6 className="mb-0 mt-3">Hãy Yến</h6>
            <p>Khách hàng</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
