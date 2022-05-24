module.exports = {
  siteMetadata: {
    title: `web-replay`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
      /*
      {
  resolve: 'gatsby-source-wordpress',
  options: {
    "url": "http://localhost:8080/"
  }
}
, {
  resolve: 'gatsby-plugin-google-analytics',
  options: {
    "trackingId": ""
  }
},
* */
    {
      resolve: 'gatsby-source-firestore',
      options: {
        credential: require("./src/web-logic/serviceAccount.json"),
        types: [
          {
            type: 'replays',
            collection: 'replays',
            map: doc => ({
              test_champ: doc.test_champ,
            }),
          }
        ],
      },
    },
  "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
    {
      resolve: `gatsby-plugin-sass`
    }
  ]
};