import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { spacing, breakpoints } from '..';

const MasonryDiv = styled.div`
  @media (min-width: ${breakpoints.small}) {
    display: grid;
    grid-auto-flow: column;
    max-width: ${breakpoints.large};
    margin: 0 auto;
    grid-gap: ${spacing.desktop};
    grid-template-columns: 1fr 1fr;
  }
`;

const Col = styled.div`
  display: grid;
  grid-auto-rows: max-content;
`;

const Masonry = ({ children }: { children: any }) => {
  const cols: any[][] = [];
  const ref = useRef<HTMLDivElement>(null);
  const numCols = 2;

  // If we want to allow for 3 columns later...

  // const [numCols, setNumCols] = useState(2);
  // const [timerId, setTimerId] = useState(0);
  // const minWidth = 330;

  // const calcNumCols = () => {
  //   clearTimeout(timerId);
  //   const newTimerId = setTimeout(() => {
  //     setNumCols(Math.floor(ref.current!.offsetWidth / minWidth));
  //   }, 1000);
  //   setTimerId(newTimerId);
  // };
  // useEffect(() => {
  //   window.addEventListener(`resize`, calcNumCols);
  //   calcNumCols();
  //   return () => window.removeEventListener(`resize`, calcNumCols);
  // }, []);

  const createCols = () => {
    for (let i = 0; i < numCols; i++) cols[i] = [];
    children.forEach((child: any, i: number) => {
      if (Array.isArray(child)) {
        child.forEach((c, i) => {
          cols[i % numCols].push(c);
        });
      } else {
        cols[i % numCols].push(child);
      }
    });
  };

  createCols();

  return (
    <MasonryDiv ref={ref}>
      {Array(numCols)
        .fill('')
        .map((_, i) => (
          <Col key={i}>{cols[i]}</Col>
        ))}
    </MasonryDiv>
  );
};

export { Masonry };
