export default async function (eleventyConfig) {

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
