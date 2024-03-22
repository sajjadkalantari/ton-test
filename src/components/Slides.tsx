import WebApp from '@twa-dev/sdk';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAction, postUserAction } from '../apis/api';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';
import { setMenuVisibility } from '../states/actions';
import { AppContainer, Button, StyledApp } from './styled/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Slides() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(async () => {
    WebApp.BackButton.hide();
    navigate(-1);
  });


  const res = useAsyncInitialize(async () => {
    const response = await getAction(Number(id));
    return response;
  }, [id]);
  const totalSlides = res?.actionFiles.length;


  const swiperRef = useRef(null);
  const goToNextSlide = () => {
    console.log("goToNextSlide")
    if (swiperRef.current && swiperRef.current.swiper) {
      console.log("goToNextSlide2")
      setIsButtonDisabled(true);
      setTimeLeft(5);
      swiperRef.current.swiper.allowSlideNext = true;
      swiperRef.current.swiper.slideNext();
      swiperRef.current.swiper.allowSlideNext = false;
    }
  };

  useEffect(() => {
    dispatch(setMenuVisibility(false));
    return () => {
      dispatch(setMenuVisibility(true));
    };
  }, []);


  // State to keep track of the countdown time
  const [timeLeft, setTimeLeft] = useState(5);

  // State to control the button's disabled property
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    // Only set up the interval if timeLeft is greater than 0
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    } else {
      // Enable the button when the countdown is over
      setIsButtonDisabled(false);
    }
    console.log("timeLeft", timeLeft)
    // progressCircle.current.style.setProperty('--progress', 1 - (timeLeft / 5));
  }, [timeLeft]);
  const pagination = {
    clickable: false,
    renderBullet: function (index: any, className: any) {
      return '<span class=' + className + ' style="min-width: 100px;background: #FFEEB1;height: 2px;border-radius: 0;"></span>';
    },
  };
  return (
    <StyledApp>
      <AppContainer>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" style={{ '--progress': 1 - (timeLeft / 5) }}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span>{timeLeft}s</span>
        </div>
        <FontAwesomeIcon style={{ fontSize: 20, zIndex: 999, position: "absolute", top: "30px", right: "16px" }}
          onClick={() => { navigate("/") }} icon={faClose}>

        </FontAwesomeIcon>
        <Swiper
          ref={swiperRef}
          allowSlidePrev={false}
          allowTouchMove={false}
          pagination={pagination}
          modules={[Pagination, Navigation]}
        >

          {
            res?.actionFiles?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={item.filePath}
                    alt={item.title}
                    style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                  />
                  <div style={{ textAlign: "center", marginBottom: "5px" }}>
                    <h3>{item.title}</h3>
                    <p style={{ color: "#DDD", fontSize: "medium" }}>{item.description}</p>
                  </div>

                  {index < totalSlides - 1 && (
                    <Button style={{ zIndex: 9999, width: "100%" }} disabled={isButtonDisabled} onClick={goToNextSlide}>
                      NEXT
                    </Button>
                  )}
                  {index === totalSlides - 1 && (
                    <Button style={{ zIndex: 9999, width: "100%" }} disabled={isButtonDisabled} onClick={async () => {
                      await postUserAction(Number(id), { data: "" });
                      navigate(-1);
                    }}>DONE</Button>
                  )}
                </div>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </AppContainer>

    </StyledApp>
  );
}
