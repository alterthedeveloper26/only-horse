"use client";

import { CldVideoPlayer } from "next-cloudinary";

const TodaysHighlight = () => {
  return (
    <div className="mx-auto w-full md:w-3/4">
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
