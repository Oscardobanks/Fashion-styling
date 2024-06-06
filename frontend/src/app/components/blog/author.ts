export interface Author {
    id: number;
    firstname: string;
    lastname: string;
    image: string;
    about: string;
    gender: string;
}

export const authors = [
    {
        id: 0,
        firstname: 'Ndenka',
        lastname: 'Shailey',
        image: '../assets/authors/istockphoto-1008909370-612x612.jpg',
        about: 'I am a budding fashion stylist, with a passion for creating unique and memorable looks. I have worked with local clients and have a growing portfolio, showcasing my talent for creating timeless and elegant looks. I am excited to continue growing my career and making a name for myself in the fashion industry.',
        gender: 'Female',
    },
    {
        id: 1,
        firstname: 'Fanu',
        lastname: 'Chris',
        image: '../assets/authors/istockphoto-1045886754-612x612.jpg',
        about: 'I am a self-taught fashion stylist, with a love for creating bold and daring looks. I have worked with a variety of clients, from musicians to models, and have a reputation for pushing the boundaries of fashion. I am always looking for new opportunities to showcase my talent and make a statement in the fashion world.',
        gender: 'Male',
    },
    {
        id: 2,
        firstname: 'Ani',
        lastname: 'Rosenstein',
        image: '../assets/authors/istockphoto-1436127770-612x612.jpg',
        about: 'I am a seasoned fashion stylist, with over 10 years of experience in the industry. I have worked with high-profile clients, such as A-list celebrities and fashion icons, and have made a name for myself as a trusted and respected stylist. I am known for my refined and sophisticated styling approach, and my ability to create timeless and elegant looks.',
        gender: 'Female',
    },
    {
        id: 3,
        firstname: 'Ayamba',
        lastname: 'Justin',
        image: '../assets/authors/istockphoto-1453963527-612x612.jpg',
        about: 'I am a fashion stylist and designer, with a passion for creating unique and innovative looks. I have worked with a variety of clients, from musicians to models, and have a reputation for pushing the boundaries of fashion. I have also released my own collections, showcasing my talent for creating cutting-edge and trend-setting pieces.',
        gender: 'Male',
    },
]