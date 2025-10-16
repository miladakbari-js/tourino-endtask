// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCards, Autoplay, Navigation, Pagination } from "swiper/modules";

// // import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-cards";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function Slider() {
//   return (
//     <div
//       style={{
//         width: "250px", 
//         height: "300px", 
//         margin: "auto",
//       }}
//     >
//       <Swiper
//         modules={[EffectCards, Autoplay, Navigation, Pagination]}
//         effect="cards"
//         grabCursor={true}
//         loop={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }}
//         navigation
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <img
//             src="/pic01.svg"
//             alt="image1"
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: "16px",
//               objectFit: "cover",
//             }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/pic02.svg"
//             alt="image2"
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: "16px",
//               objectFit: "cover",
//             }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/pic03.svg"
//             alt="image3"
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: "16px",
//               objectFit: "cover",
//             }}
//           />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img
//             src="/pic04.svg"
//             alt="image4"
//             style={{
//               width: "100%",
//               height: "100%",
//               borderRadius: "16px",
//               objectFit: "cover",
//             }}
//           />
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// }

// export default Slider;



import { useState } from "react";
import styles from "./Slider.module.css";

function Slider() {
  const [pics, setPics] = useState([
    "/pic01.svg",
    "/pic02.svg",
    "/pic03.svg",
    "/pic04.svg",
  ]);

  const [counter , setCounter] = useState(1)
console.log(pics.length);
  const positions = [styles.box1, styles.box2, styles.box3, styles.box4];

  const handleNext = () => {
    setCounter(counter=>counter+1)
    if (counter === 4 ){
      setCounter(1)
    }
    setPics((prev) => {
      const newArr = [...prev];
      const first = newArr.shift();
      newArr.push(first);
      return newArr;
    });
  };

  const handlePrev = () => {
    setCounter(counter=>counter-1)
    if (counter === 1 ){
      setCounter(4)
    }
    setPics((prev) => {
      const newArr = [...prev];
      const last = newArr.pop();
      newArr.unshift(last);
      return newArr;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.pics}>
        {pics.map((pic, index) => (
          <div key={index} className={positions[index]}>
            <img
              src={pic}
              alt={`slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
        ))}
      </div>
<div className={styles.buttons}>

      <button onClick={handleNext} >
        <img src="./arrow-right.png"/>
      </button>
      <p>{`${pics.length} / ${counter}`}</p>
      <button onClick={handlePrev}><img src="./arrow-right.png" className={styles.picleft}/></button>
</div>
    </div>
  );
}

export default Slider;
