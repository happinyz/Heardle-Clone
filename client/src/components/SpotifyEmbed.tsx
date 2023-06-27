import React, { useEffect } from "react";

interface ISpotifyEmbed {
  trackId: string;
}
const SpotifyEmbed = ({ trackId }: ISpotifyEmbed) => {
  useEffect(() => {
    function createIFrame() {
      const iFrameScript = document.createElement("script");
      iFrameScript.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
      iFrameScript.addEventListener("load", (e) => {
        console.log(e);
      });
      document.head.appendChild(iFrameScript);

      // @ts-ignore
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById("embed-iframe");
        const options = {
          uri: `spotify:track:${trackId}`,
          height: 100,
          width: "90%",
        };
        // @ts-ignore
        const callback = (EmbedController) => {};
        IFrameAPI.createController(element, options, callback);
      };
    }

    function autoplayEmbed() {
      var button: HTMLElement = document.querySelector(
        '[aria-label="Play"]'
      ) as HTMLElement;
      console.log("button", button);
      if (button) {
        console.log("swag");
        button.click();
      }
    }

    if (trackId) {
      createIFrame();
      autoplayEmbed();
    }
  }, [trackId]);
  return <div id="embed-iframe"></div>;
};

export default SpotifyEmbed;
