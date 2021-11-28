import { registerRoute } from "workbox-routing";
import { precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from "workbox-strategies";

registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages",
    plugins: [new CacheableResponsePlugin({ statuses: [200] })],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new StaleWhileRevalidate({
    cacheName: "assets",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({ maxEntries: 100 }),
    ],
  })
);

const s3url = "https://ddmath.s3.ap-northeast-2.amazonaws.com";
precacheAndRoute(self.__WB_MANIFEST);

precacheAndRoute([
  { url: `${s3url}/background/desk1.webp`, revision: null },
  { url: `${s3url}/character/stone1.webp`, revision: null },
  { url: `${s3url}/character/stone2.webp`, revision: null },
  { url: `${s3url}/character/stone3.webp`, revision: null },
  { url: `${s3url}/character/stone4.webp`, revision: null },
  { url: `${s3url}/background/desk2.png`, revision: null },
  { url: `${s3url}/background/desk3.png`, revision: null },
  { url: `${s3url}/background/stage.png`, revision: null },
  { url: `${s3url}/background/lobby.webp`, revision: null },
  { url: `${s3url}/card/card.png`, revision: null },
  { url: `${s3url}/card/check-blue.png`, revision: null },
  { url: `${s3url}/card/check-green.png`, revision: null },
  { url: `${s3url}/card/check-yellow.png`, revision: null },
  { url: `${s3url}/card/kiwi1.png`, revision: null },
  { url: `${s3url}/card/kiwi2.png`, revision: null },
  { url: `${s3url}/card/kiwi3.png`, revision: null },
  { url: `${s3url}/card/music-blue.png`, revision: null },
  { url: `${s3url}/card/music-green.png`, revision: null },
  { url: `${s3url}/card/music-yellow.png`, revision: null },
  { url: `${s3url}/card/orange1.png`, revision: null },
  { url: `${s3url}/card/orange2.png`, revision: null },
  { url: `${s3url}/card/orange3.png`, revision: null },
  { url: `${s3url}/card/star-blue.png`, revision: null },
  { url: `${s3url}/card/star-green.png`, revision: null },
  { url: `${s3url}/card/star-yellow.png`, revision: null },
  { url: `${s3url}/card/strawberry1.png`, revision: null },
  { url: `${s3url}/card/strawberry2.png`, revision: null },
  { url: `${s3url}/card/strawberry3.png`, revision: null },
  { url: `${s3url}/card/trophy-blue.png`, revision: null },
  { url: `${s3url}/card/trophy-green.png`, revision: null },
  { url: `${s3url}/card/trophy-yellow.png`, revision: null },
  { url: `${s3url}/character/run.json`, revision: null },
  { url: `${s3url}/character/run.png`, revision: null },
  { url: `${s3url}/character/stand.json`, revision: null },
  { url: `${s3url}/character/stand.png`, revision: null },
  { url: `${s3url}/game/board.webp`, revision: null },
  { url: `${s3url}/game/enemy-blue.png`, revision: null },
  { url: `${s3url}/game/enemy-green.png`, revision: null },
  { url: `${s3url}/game/enemy-yellow.png`, revision: null },
  { url: `${s3url}/game/cannon.png`, revision: null },
  { url: `${s3url}/game/coin-image.png`, revision: null },
  { url: `${s3url}/game/coin.json`, revision: null },
  { url: `${s3url}/game/coin.png`, revision: null },
  { url: `${s3url}/game/cursor-anim.json`, revision: null },
  { url: `${s3url}/game/cursor-anim.png`, revision: null },
  { url: `${s3url}/game/cursor.png`, revision: null },
  { url: `${s3url}/game/cursorClick.png`, revision: null },
  { url: `${s3url}/game/goBackButton.png`, revision: null },
  { url: `${s3url}/game/heart.png`, revision: null },
  { url: `${s3url}/game/help.png`, revision: null },
  { url: `${s3url}/game/lock.png`, revision: null },
  { url: `${s3url}/game/logout.png`, revision: null },
  { url: `${s3url}/game/point.png`, revision: null },
  { url: `${s3url}/game/sound-off.png`, revision: null },
  { url: `${s3url}/game/sound-on.png`, revision: null },
  { url: `${s3url}/game/star-empty.png`, revision: null },
  { url: `${s3url}/game/star.png`, revision: null },
  { url: `${s3url}/game/user-info.png`, revision: null },
  { url: `${s3url}/sound/background-music.mp3`, revision: null },
  { url: `${s3url}/sound/beep.wav`, revision: null },
  { url: `${s3url}/sound/click.wav`, revision: null },
  { url: `${s3url}/sound/coin.wav`, revision: null },
  { url: `${s3url}/sound/correct.mp3`, revision: null },
  { url: `${s3url}/sound/jump.wav`, revision: null },
  { url: `${s3url}/sound/pop.wav`, revision: null },
]);
