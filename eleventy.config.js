import browserslist from "browserslist";
import { bundle, browserslistToTargets } from "lightningcss";
import path from "path";

let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

export default async function (eleventyConfig) {
  // css processing inspired by https://11ty.rocks/posts/process-css-with-lightningcss/
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      return async () => {
        let { code } = await bundle({
          filename: inputPath,
          minify: true,
          sourceMap: false,
          targets,
        });
        return code;
      };
    },
  });

  eleventyConfig.setChokidarConfig({
		usePolling: true,
		interval: 500,
	});

  return {
    dir: {
      input: 'src',
      output: 'site',
      layouts: '_layouts'
    }
  };
};
