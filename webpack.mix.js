// eslint-disable-next-line @typescript-eslint/no-var-requires
const mix = require('laravel-mix');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const publicAssetsFolder = path.join(__dirname, 'public/assets');

mix
  // .postCss('resources/css/app.css', 'public/assets/css')
  .postCss('resources/js/apps/home/index.css', 'public/assets/css')
  // .js('resources/js/app.js', 'public/assets/js')
  .js('resources/js/apps/home/index.js', 'public/assets/js/apps/index.js')
  .react()
  .options({
    processCssUrls: false, // Avoids processing CSS URLs
  })
  // .disableNotifications() // Disable Mix build notifications
  .webpackConfig({
    stats: 'errors-only', // Show only errors in the console
    performance: {
      hints: false, // Disable performance hints
    },
  });
// .js('resources/js/react/apps/auth/auth.js', 'public/assets/js/apps')
// .react()
// .postCss('resources/css/apps/auth/auth.css', 'public/assets/css/apps/auth');


mix.copyDirectory('resources/fonts', publicAssetsFolder + '/fonts');
mix.copyDirectory('resources/img', publicAssetsFolder + '/img');
mix.copyDirectory('resources/images', path.join(publicAssetsFolder, "..", '/images'));

mix.browserSync('localhost:3021');

mix.options({ postCss: [require('tailwindcss')] });
