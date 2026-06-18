import {notFound} from "next/navigation";

type Props = {
    params: Promise<{ recipeType: string }>;
};
export default async function RecipeTypePage({params}: Props) {
    const {recipeType} = await params;

    if (recipeType === 'favorites') {
        return <p>Favorites tab</p>;
    }

    if (recipeType === 'own') {
        return <p>My recipes</p>;
    }

    notFound();
}
