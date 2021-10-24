function RGBAToHexA(r:number,g:number,b:number,a:number) {
  let red = r.toString(16);
  let green = g.toString(16);
  let blue = b.toString(16);
  let alpha = Math.round(a * 255).toString(16);

  if (red.length == 1)
    red = "0" + red;
  if (green.length == 1)
    green = "0" + green;
  if (blue.length == 1)
    blue = "0" + blue;
  if (alpha.length == 1)
    alpha= "0" + alpha;

  return "#" + red + green + blue + alpha;
}
export default RGBAToHexA;
