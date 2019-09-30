export default {
  app: {
    state: "loaded"
  },
  auth: {
    authenticated: true,
    token: "abc123",
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://dummyimage.com/100x100.png/5fa2d1/ffffff"
    }
  },
  genres: {
    list: [
      {
        name: "Comedy",
        slug: "comedy"
      },
      {
        name: "Adventure",
        slug: "adventure"
      }
    ]
  },
  movies: {
    list: [
      {
        id: "0b7b8b05-6c88-4517-a969-adf89a46bc0a",
        title: "Lost Palace",
        genre: ["comedy"],
        image: "http://dummyimage.com/100x100.png/cc0000/ffffff",
        description:
          "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        price: 2.39,
        slug: "gunner-palace",
        title_lower: "lost palace"
      },
      {
        id: "f01187b5-6fe8-465b-a0b8-3764a94ae225",
        title: "Love is Eternal While It Lasts",
        genre: ["comedy", "romance"],
        image: "http://dummyimage.com/100x100.png/5fa2dd/ffffff",
        description:
          "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        price: 9.5,
        slug: "love-is-eternal-while-it-lasts",
        title_lower: "love is eternal while it lasts"
      },
      {
        id: "23ad0474-8b8d-420d-a2cc-dd54aa6ed589",
        title: "Lost World, The",
        genre: ["romance"],
        image: "http://dummyimage.com/100x100.png/cc0000/ffffff",
        description:
          "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        price: 7.4,
        slug: "lost-world-the",
        title_lower: "lost world, the"
      }
    ]
  },
  cart: {
    dict: {
      "0b7b8b05-6c88-4517-a969-adf89a46bc0a": 1,
      "23ad0474-8b8d-420d-a2cc-dd54aa6ed589": 2
    },
    saved: false
  },
  filters: {
    string: "Lo",
    string_lower: "lo"
  },
  ui: {
    language: "en",
    version: 2,
    theme: "light"
  },
  routing: {
    locationBeforeTransitions: {
      pathname: "/genre/comedy",
      search: "",
      hash: "",
      key: "sb1up4"
    }
  },
  form: {}
};
