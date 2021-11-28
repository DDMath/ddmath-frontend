import { Workbox } from "workbox-window";

export default function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/service-worker.js");

    wb.register();
  }
}
