import React, { useRef, useState } from 'react';
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slides.css';
import { useNavigate, useParams } from 'react-router-dom';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { AppContainer, Button, StyledApp } from './styled/styled';
import WebApp from '@twa-dev/sdk';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';

export default function Slides() {

  const { id } = useParams();

  const [data, setData] = useState<any>();


  const navigate = useNavigate();
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {

    WebApp.BackButton.hide();
    navigate(-1);
  });


  const res = useAsyncInitialize(async () => {
    const response = await axios.get(`http://localhost:5120/App/actions/${id}`);
    setData(response.data);
    return response.data;
  }, [id]);
  const totalSlides = res?.actionFiles.length;

  return (
    <StyledApp>
      <AppContainer>
        <Swiper
          pagination={{
            type: 'progressbar',
          }}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {
            res?.actionFiles?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="card" style={{ width: '300px', height: '400px' }}>
                  <img
                    src={item.filePath}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  {index === totalSlides - 1 && (
                    <Button onClick={() => {
                      navigate(-1);
                    }}>NEXT</Button>
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
