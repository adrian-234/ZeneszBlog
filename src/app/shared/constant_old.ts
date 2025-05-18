export const ProfileObject = [
    {
        'id': 1,
        'name': 'Kis pista', 
        'email': 'kis@gmail.com',
        'password': 'kisPista',
        'groups': [1, 2, 3],
        'role': 'writer'
    },
    {
        'id': '2',
        'name': 'Nagy pista', 
        'email': 'Nagy@gmail.com',
        'password': 'titkos jelszo',
        'groups': [2],
        'role': "reader"
    },
    {
        'id': 3,
        'name': 'Közepes pista', 
        'email': 'kozepes@gmail.com',
        'password': 'asd',
        'groups': [1, 2, 3],
        'role': 'reader'
    },
];

export const GroupObject = [
    {
        'id': 1,
        'name': 'D&B',
        'posts': [1,2]
    },
    {
        'id': 2,
        'name': 'Hardstyle',
        'posts': [4]
    },
    {
        'id': 3,
        'name': 'Magyar Rap',
        'posts': [3]
    }
];

export const PostObject = [
    {
        'id': 1,
        'title': "Első cikkem",
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices risus at elit elementum ultrices. Nulla vel nunc sit amet massa dictum pharetra. Nulla non orci et nulla congue varius ac vel enim. Maecenas eu mauris quis nulla consequat interdum. Fusce sodales est vel quam efficitur lacinia.",
        'author': 1,
        'comments': [1],
        'date': '2025-4-10'
    },
    {
        'id': 2,
        'title': "Lorem ipsum",
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices risus at elit elementum ultrices. Nulla vel nunc sit amet massa dictum pharetra. Nulla non orci et nulla congue varius ac vel enim. Maecenas eu mauris quis nulla consequat interdum. Fusce sodales est vel quam efficitur lacinia.",
        'author': 1,
        'comments': [],
        'date': '2025-4-12'
    },
    {
        'id': 3,
        'title': "Quisque ultrices",
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices risus at elit elementum ultrices. Nulla vel nunc sit amet massa dictum pharetra. Nulla non orci et nulla congue varius ac vel enim. Maecenas eu mauris quis nulla consequat interdum. Fusce sodales est vel quam efficitur lacinia.",
        'author': 1,
        'comments': [2,3],
        'date': '2025-4-10'
    },
    {
        'id': 4,
        'title': "Nulla non",
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices risus at elit elementum ultrices. Nulla vel nunc sit amet massa dictum pharetra. Nulla non orci et nulla congue varius ac vel enim. Maecenas eu mauris quis nulla consequat interdum. Fusce sodales est vel quam efficitur lacinia.",
        'author': 1,
        'comments': [],
        'date': '2025-4-11'
    },
];

export const CommentObject = [
    {
        'id': 1,
        'text': "ide nem tudom hogy mit írjak de ez egy komment",
        'author': 2
    },
    {
        'id': 2,
        'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultrices risus at elit elementum ultrices.",
        'author': 3 
    },
    {
        'id': 3,
        'text': "Quisque ultrices risus at elit elementum ultrices.",
        'author': 2
    }
];