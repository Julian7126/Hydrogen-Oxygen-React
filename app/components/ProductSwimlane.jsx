import {ProductCard, Section} from '~/components';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import '../styles/SwiperStyles.css';
import {useFetcher} from '@remix-run/react';
import {useState, useEffect} from 'react';

const mockProducts = {
  nodes: new Array(20).fill(''),
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 20,
  ...props
}) {
  const fetcher = useFetcher();
  const [categoryProducts, setCategoryProducts] = useState([]);

  const setParamTag = (event) => {
    const tag = event.target.dataset.tag;
    console.log(`Buscando productos con el tag: ${tag}`);
    fetcher.load(`/?tag=${tag}`);
  };

  useEffect(() => {
    if (fetcher.data) {
      console.log('Datos recibidos:', fetcher.data);
      setCategoryProducts(fetcher.data.featuredProducts.products.nodes);
    } else {
      setCategoryProducts(products.nodes)
    }
  }, [fetcher.data]);

  return (
    <>
      <Section padding="y" {...props}>
        <h2 className="h2 text-center pt-8">{title} </h2>
        <div className="flex gap-5 justify-center mt-5 mb-8">
          <button
            className="bg-dark-500 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition duration-300 uppercase upercasse-offset"
            data-tag="Premium"
            onClick={setParamTag}
          >
            Premium
          </button>
          <button
            className="bg-dark-500 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition duration-300 uppercase upercasse-offset"
            data-tag="Sport"
            onClick={setParamTag}
          >
            Sport
          </button>
          <button
            className="bg-dark-500 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition duration-300 uppercase upercasse-offset"
            data-tag="Accessories"
            onClick={setParamTag}
          >
            Accessories
          </button>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          className="swiper-container"
          spaceBetween={12}
          slidesPerView={5}
          pagination={{clickable: true}}
          scrollbar={{draggable: true}}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <div className="swiper-button-next">
            <i className="fa-arrow-right"> → </i>
          </div>
          <div className="swiper-button-prev">
            <i className="fa-arrow-left"> ← </i>
          </div>
          {categoryProducts.map((product) => (
            <SwiperSlide>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>
    </>
  );
}
