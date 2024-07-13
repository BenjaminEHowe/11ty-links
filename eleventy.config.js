import browserslist from "browserslist";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import htmlmin from "html-minifier-terser";
import { bundle, browserslistToTargets } from "lightningcss";
import path from "path";

let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

export default async function (eleventyConfig) {
  eleventyConfig.addDataExtension("json", (contents) => JSON.parse(contents) );

  eleventyConfig.addPlugin(eleventyAutoCacheBuster, {
    hashTruncate: 8,
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
				removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
				useShortDoctype: true,
			});
			return minified;
		}
		// if not HTML, return content as-is
		return content;
	});

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
      input: '11ty-src',
      output: 'site',
      layouts: '_layouts'
    }
  };
};
