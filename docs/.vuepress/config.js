module.exports = {
    title: 'CPSC Recalls App',
    description: 'Recalls PWA App is the idea of always start any new development project with a mobile first mindset',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/' },
            { text: 'Versions',
                 items: [
                    {text: '0.1', link:'0.1.md'},
                    {text: '1.0', link:'1.0.md'}
                 ]
            },
            { text: 'CPSC APIs', link: '/apidocs/' },
            { text: 'CPSC', link: 'https://www.cpsc.gov' },
          ],
        sidebar: [
            {
                title: 'Overview',
                collapsable: false,
                children: ['/']
               
              },
             
        ]
      }

}