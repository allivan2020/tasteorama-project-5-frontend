import {NextResponse} from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;

function getToken(req: Request) {
    const cookie = req.headers.get('cookie') || '';
    return cookie.match(/accessToken=([^;]+)/)?.[1];
}



const MOCK_RECIPES = [
    {
        _id: '1',
        title: 'Classic French Omelette',
        description: 'A soft, creamy classic with butter and eggs.',
        category: 'Breakfast',
        ingredients: ['eggs', 'butter', 'chives'],
        cookingTime: 10,
        calories: 150,
        image: '/recipe-1.jpg'
    },
    {
        _id: '2',
        title: 'Pasta Carbonara',
        description: 'A classic Italian dish with bacon, Pecorino cheese, and eggs.',
        category: 'Main',
        ingredients: ['pasta', 'bacon', 'eggs', 'pecorino'],
        cookingTime: 12,
        calories: 200,
        image: '/recipe-2.jpg'
    },
    {
        _id: '3',
        title: 'Beef Burger',
        description: 'Juicy beef patty in a bun with vegetables and sauces.',
        category: 'Main',
        ingredients: ['beef', 'bun', 'lettuce', 'tomato'],
        cookingTime: 15,
        calories: 300,
        image: '/recipe-3.jpg'
    },
    {
        _id: '4',
        title: 'Margherita Pizza',
        description: 'Traditional pizza with tomatoes, mozzarella, and basil.',
        category: 'Main',
        ingredients: ['dough', 'tomato', 'mozzarella', 'basil'],
        cookingTime: 8,
        calories: 250,
        image: '/recipe-4.jpg'
    },
    {
        _id: '5',
        title: 'Omelette with Mushrooms',
        description: 'A nutritious omelette with fresh mushrooms and herbs.',
        category: 'Breakfast',
        ingredients: ['eggs', 'mushrooms', 'herbs'],
        cookingTime: 6,
        calories: 150,
        image: '/recipe-8.jpg'
    },
    {
        _id: '6',
        title: 'Tom Yum Soup',
        description: 'Spicy Thai soup with shrimp and aromatic herbs.',
        category: 'Soup',
        ingredients: ['shrimp', 'lemongrass', 'chili', 'lime'],
        cookingTime: 14,
        calories: 500,
        image: '/recipe-7.jpg'
    },
    {
        _id: '7',
        title: 'Philadelphia Sushi Roll',
        description: 'A refreshing blend of salmon, cream cheese, and avocado.',
        category: 'Sushi',
        ingredients: ['salmon', 'cream cheese', 'avocado', 'rice'],
        cookingTime: 9,
        calories: 300,
        image: '/recipe-6.jpg'
    },
    {
        _id: '8',
        title: 'Caesar Salad',
        description: 'Crispy romaine lettuce with croutons and parmesan.',
        category: 'Salad',
        ingredients: ['lettuce', 'croutons', 'parmesan', 'caesar dressing'],
        cookingTime: 5,
        calories: 180,
        image: '/recipe-5.jpg'
    },
    {
        _id: '9',
        title: 'Omelette with Goat Cheese',
        description: 'Creamy goat cheese and fresh spinach blend.',
        category: 'Breakfast',
        ingredients: ['eggs', 'goat cheese', 'spinach'],
        cookingTime: 7,
        calories: 200,
        image: '/recipe-9.jpg'
    },
    {
        _id: '10',
        title: 'Omelette with Smoked Salmon',
        description: 'Soft eggs with rich smoked salmon and fresh dill.',
        category: 'Breakfast',
        ingredients: ['eggs', 'smoked salmon', 'dill'],
        cookingTime: 5,
        calories: 180,
        image: '/recipe-10.jpg'
    },
    {
        _id: '11',
        title: 'Omelette with Ratatouille',
        description: 'Classic ratatouille vegetables in a soft omelette.',
        category: 'Breakfast',
        ingredients: ['eggs', 'zucchini', 'eggplant', 'pepper'],
        cookingTime: 11,
        calories: 350,
        image: '/recipe-11.jpg'
    },
    {
        _id: '12',
        title: 'Omelette with Vegetables',
        description: 'Provençal flavors of peppers, tomatoes, and zucchini.',
        category: 'Breakfast',
        ingredients: ['eggs', 'peppers', 'tomatoes', 'zucchini'],
        cookingTime: 10,
        calories: 400,
        image: '/recipe-12.jpg'
    }
];

function getMockResponse(searchParams: URLSearchParams) {
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('limit')) || 12;
    const category = searchParams.get('category') || '';
    const ingredient = searchParams.get('ingredient') || '';

    let filtered = [...MOCK_RECIPES];

    if (category) {
        filtered = filtered.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }
    if (ingredient) {
        filtered = filtered.filter(r => r.ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase())));
    }

    const totalRecipes = filtered.length;
    const totalPages = Math.ceil(totalRecipes / perPage);
    const recipes = filtered.slice((page - 1) * perPage, page * perPage);

    return {recipes, totalRecipes, totalPages, currentPage: page};
}

/* ========================================================= */

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);

    // Є бек — йдемо туди
    if (BACKEND_URL) {
        try {
            const token = getToken(req);
            const query = searchParams.toString();
            const res = await fetch(`${BACKEND_URL}/recipes${query ? `?${query}` : ''}`, {
                headers: {Authorization: token ? `Bearer ${token}` : ''},
            });

            if (res.ok) {
                const data = await res.json();
                return NextResponse.json(data);
            }
        } catch {
            // бек впав — віддаємо мок
        }
    }

    // Без бека — мок
    return NextResponse.json(getMockResponse(searchParams));
}

export async function POST(req: Request) {
    if (!BACKEND_URL) {
        return NextResponse.json({message: 'Backend not configured'}, {status: 503});
    }

    const token = getToken(req);
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return NextResponse.json({message: 'Backend error', status: res.status}, {status: res.status});
    }

    const data = await res.json().catch(() => null);
    return NextResponse.json(data);
}
