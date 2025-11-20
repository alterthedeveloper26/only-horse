"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const TodaysHighlight = () => {
  return (
    <div className="w-full md:w-3/4 mx-auto">
      <CldVideoPlayer
        src="highlighted-vid_h6p1gv.mp4"
        className="rounded-md"
        width={960}
        height={540}
      />
    </div>
  );
};

export default TodaysHighlight;
