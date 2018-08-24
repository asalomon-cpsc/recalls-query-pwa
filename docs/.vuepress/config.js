module.exports = {
    title: 'CPSC Recalls App',
    description: 'Recalls PWA App is the idea of always start any new development project with a mobile first mindset',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/' },
            { text: 'CPSC APIs', link: '/apidocs/' },
            { text: 'CPSC', link: 'https://www.cpsc.gov' },
          ],
        sidebar: [
            {
                title: 'Background',
                collapsable: false,
                children: ['/']
               
              },
             
        ]
      }

}