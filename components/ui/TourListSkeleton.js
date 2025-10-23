import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const TourListSkeleton = ({
  heading = { width: 140, height: 24 },
  padding = 20,
  borderRadius = 4,
  ...props
}) => {
  const [responsiveWidth, setResponsiveWidth] = useState(1366);
  const [responsiveColumn, setResponsiveColumn] = useState(4);
  const [responsiveRow, setResponsiveRow] = useState(2);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;

      if (w <= 390) {
        // 📱 موبایل
        setResponsiveWidth(w - 40);
        setResponsiveColumn(1);
        setResponsiveRow(5);
      } else {
        // 🖥 دسکتاپ
        setResponsiveWidth(1200);
        setResponsiveColumn(4);
        setResponsiveRow(2);
      }
    };

    updateWidth(); // مقدار اولیه
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const list = [];
  let height;

  for (let i = 1; i <= responsiveRow; i++) {
    for (let j = 0; j < responsiveColumn; j++) {
      const itemWidth =
        (responsiveWidth - padding * (responsiveColumn + 1)) /
        responsiveColumn;

      const x = padding + j * (itemWidth + padding);
      const height1 = itemWidth;
      const height2 = 20;
      const height3 = 20;

      const space =
        padding + height1 + (padding / 2 + height2) + height3 + padding * 4;

      const y1 = padding + heading.height + padding * 2 + space * (i - 1);
      const y2 = y1 + padding + height1;
      const y3 = y2 + padding / 2 + height2;

      list.push(
        <React.Fragment key={`${i}-${j}`}>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </React.Fragment>
      );

      if (i === responsiveRow) {
        height = y3 + height3;
      }
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${responsiveWidth} ${height}`}
      width={responsiveWidth}
      height={height}
      {...props}
    >
      {heading && (
        <rect
          x={padding}
          y={padding}
          rx={0}
          ry={0}
          width={heading.width}
          height={heading.height}
        />
      )}
      {list}
    </ContentLoader>
  );
};

export default TourListSkeleton;
