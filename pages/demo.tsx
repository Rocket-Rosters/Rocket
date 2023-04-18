import React from 'react';
import YouTube from 'react-youtube';

const videoId = 'iq0DxiEYLbQ';

const YoutubeVideoTemplate = () => {
  const opts = {
    height: '500',
    width: '800',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YoutubeVideoTemplate;
