module.exports = {
  siteMetadata: {
    title: `web-replay`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }
  /*
  ,
    {

      resolve: `gatsby-source-mysql`,
      options: {
        connectionDetails: {
          host: 'https://ftp.cluster014.hosting.ovh.net',
          user: 'footfemisite',
          password: 'Zc45c552000',
          database: 'footfemisite'
        },
        queries: [
            {
                statement: 'SELECT * FROM wr_test2',
                idFieldName: 'Id',
                name: 'Title'
            }
        ]
      }
    }
   */
  ]
};
