import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
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

export default function Slides() {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(setMenuVisibility(false));
    return () => {
      dispatch(setMenuVisibility(true));      
    };
  }, []);


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

  return (
    <StyledApp>
      <AppContainer>
        <Swiper
          pagination={{
            type: 'progressbar',
          }}
          // navigation={true}
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
                  <div style={{ textAlign: "center", marginBottom:"5px" }}>
                    <h3>{item.title}</h3>
                    <p style={{ color: "#DDD", fontSize:"medium" }}>{item.description}</p>
                  </div>
                  {index === totalSlides - 1 && (
                    <Button onClick={async () => {
                      await postUserAction(Number(id), { data: "" });
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
