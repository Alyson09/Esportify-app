import Company from '../../models/Company'
import Block from '../../models/Block'
import Day from '../../models/Day'


export const BLOCKS= [
    new Block(
        1,
        'Goat arena',
        'https://www.tudograma.com.br/images/blog/construcao-de-quadra-de-futebol-society-e-com-a-tudo-grama/construcao-de-quadra-de-futebol-society-e-com-a-tudo-grama-1.jpg',
        'Rua Chuva de Prata',
        150,
        36889110
    ),
    new Block(
        2,
        'Harpa.IA Arena',
        'https://static.sportit.com.br/public/sportit/imagens/produtos/piso-modular-quadra-completa-m2-2906.jpg',
        'Rua Oswaldo Cruz',
        130,
        36889110
    ),
    new Block(
        3,
        'Jorlan',
        'https://www.sescpr.com.br/wp-content/uploads/2023/02/52570915440_679cb532f9_o-scaled.jpg',
        'Rua Rui Barbosa',
        209,
        36889110
    ),
    new Block(
        4,
        'Sicoob',
        'https://www.recreiodajuventude.com.br/userfiles/redacao/posts/quadra-areia-noticia-1.jpg',
        'Rua Universal',
        10,
        36889110
    )
]

export const COMPANIES = [
    new Company(
        1,
        'Goat',
        'https://i.imgur.com/0mpg3sp.jpeg'
    ),
    new Company(
        2,
        'Nilton.IA',
        'https://i.imgur.com/KLNin1G.jpeg'
    ),
    new Company(
        3,
        'Sol e neve',
        'https://i.imgur.com/YzgPjRI.jpeg'
    )
]

export  const DAYS = [
    new Day(
        'Segunda-feira: 12',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Terça-feira: 13',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Quarta-feira: 14',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Quinta-feria: 15',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Sexta-feria: 16',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Sábado: 17',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
    new Day(
        'Domingo: 18',
        ["13:00", "15:00" , "17:00" , "19:00"],
        ["14:00", "16:00", "18:00", "20:00"]
    ),
] 