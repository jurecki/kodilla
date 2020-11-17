export const pageContents = {
    title: 'My first React app',
    subtitle: 'A simple to-do app, with lists, columns and cards'
};

export const listData = {
  title: 'Things to do <sup>soon!</sup>',
  description: 'Interesting things I want to <strong>check out!</strong>',
  imageBig: '../../../public/images/space_big.png',
  imageNormal: '../../../public/images/space_normal.png',
  imageSmall: '../../../public/images/space_small.png',
  columns: [
    {
      key: 0,
      title: 'Books',
      icon: 'book',
      cards: [
        {
          key: 0,
          title: 'This Is Going to Hurt',
        },
        {
          key: 1,
          title: 'Interpreter of Maladies',
        },
      ],
    },
    {
      key: 1,
      title: 'Movies',
      icon: 'film',
      cards: [
        {
          key: 0,
          title: 'Harry Potter',
        },
        {
          key: 1,
          title: 'Star Wars',
        },
      ],
    },
    {
      key: 2,
      title: 'Games',
      icon: 'gamepad',
      cards: [
        {
          key: 0,
          title: 'The Witcher',
        },
        {
          key: 1,
          title: 'Skyrim',
        },
      ],
    },
  ],
};

export const settings = {
    defaultListDescription: '<p> I can do all the things!!</p>'
}