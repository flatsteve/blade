export default function track(event) {
  if (!window.goatcounter) {
    return;
  }

  if (typeof window.goatcounter.count === "function") {
    window.goatcounter.count(event);
  }
}
