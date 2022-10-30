import { canvasJp } from "canvas-jp";
import { seedNavigation } from "canvas-jp/plugins/seedNavigation";
import { Color, white } from "canvas-jp/Color";
import { Point } from "canvas-jp/Point";
import { Circle } from "canvas-jp/Circle";

canvasJp(
  document.querySelector("#container") as HTMLDivElement,
  function* (random, { width, height }) {
    let elements: any[] = [];

    elements.push(
      Circle(Point(width / 2, height / 2), Math.min(width, height) / 3, {
        color: Color(random.value(), 0.2, 0.8),
        opacity: 1,
      })
    );

    yield {
      background: white,
      elements: elements,
    };
  },
  () => {
    const params = new URLSearchParams(window.location.search);

    let width = 1200;
    let height = (width / 21) * 29.7;
    const windowRatio = window.innerWidth / window.innerHeight;

    const imageRatio = width / height;
    const resolutionFactor =
      windowRatio > imageRatio
        ? window.innerHeight / height
        : window.innerWidth / width;

    const selectedWidth = Number(params.get("width"));
    const resolution = selectedWidth ? selectedWidth / width : resolutionFactor;

    return {
      width: width,
      height: height,
      resolution: resolution,
      interactive: false,
      plugins: [seedNavigation],
    };
  }
);
