// 3rd party api use different cdns
const domainNumbers = Array.from({ length: 45 }, (_, i) => `${i + 1}.media.tumblr.com`);

module.exports = {
  images: {
    // domains: [
    //   "cdn2.thecatapi.com", 
    //   "images.dog.ceo", 
    //   "randomfox.ca",
    //   ...domainNumbers
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
      },
      {
        protocol: 'https',
        hostname: 'randomfox.ca',
      },
    ],
  },
};
