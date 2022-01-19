"use strict";

module.exports.hello = async (event) => {
  // Just show a star as an example
  const exampleSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<path d="M50,3l12,36h38l-30,22l11,36l-31-21l-31,21l11-36l-30-22h38z" ' +
    'fill="#FF0" stroke="#FC0" stroke-width="2"/>' +
    "</svg>";

  return {
    statusCode: 200,
    body: exampleSvg,
    headers: {
      // Set the content type to the correct Mime type
      "Content-Type": "image/svg+xml",
    },
  };
};
