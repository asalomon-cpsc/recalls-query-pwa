module.exports = {
    title: 'CPSC Recalls App ',
    base:'/docs/',
    description: '',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/' },
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