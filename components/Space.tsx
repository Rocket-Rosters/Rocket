import { FC } from 'react';
// https://codepen.io/sarazond/pen/LYGbwj
const Space: FC = () => {
  // n is number of stars required
  const multipleBoxShadow = (n: number): string => {
    let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
    for (let i = 2; i <= n; i++) {
      value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
    }
    return value;
  };

  const shadowsSmall = multipleBoxShadow(700);
  const shadowsMedium = multipleBoxShadow(200);
  const shadowsBig = multipleBoxShadow(100);

  return (
    <>
      <style jsx>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translate(-2000px);
          }
        }

        html {
          height: 2%;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
          overflow: hidden;
        }

        #stars,
        #stars2,
        #stars3 {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          width: 1px;
          height: 1px;
          background: transparent;
          animation: animStar 50s linear infinite;
        }

        #stars2 {
          width: 2px;
          height: 2px;
          box-shadow: ${shadowsMedium};
          animation: animStar 100s linear infinite;
        }

        #stars3 {
          width: 3px;
          height: 3px;
          box-shadow: ${shadowsBig};
          animation: animStar 150s linear infinite;
        }

        #stars::after,
        #stars2::after,
        #stars3::after {
          content: ' ';
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
        }

        #stars::after {
          box-shadow: ${shadowsSmall};
        }

        #stars2::after {
          width: 2px;
          height: 2px;
          box-shadow: ${shadowsMedium};
        }

        #stars3::after {
          width: 3px;
          height: 3px;
          box-shadow: ${shadowsBig};
        }

        #title {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          margin-top: -60px;
          padding-left: 10px;
          color: #fff;
          text-align: center;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 50px;
          letter-spacing: 10px;
        }

        #title span {
          background: -webkit-linear-gradient(white, #38495a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type = "text/css" />
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <div id="title">
            <span>Rocket Rosters</span>
        </div>
    </>
    );
};

export default Space;


