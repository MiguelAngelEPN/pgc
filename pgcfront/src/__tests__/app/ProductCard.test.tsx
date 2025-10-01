import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";

const product = {
    id: "1",
    title: "Producto de prueba",
    price: 100,
    rating: 4,
    stock: 10,
    thumbnail: "/test.jpg",
    description: "desc",
};

beforeEach(() => {
    localStorage.clear();
});

test("marca y persiste un producto como favorito", () => {
    render(<ProductCard product={product} />);

    const favButton = screen.getByLabelText("Marcar como favorito");
    fireEvent.click(favButton);

    expect(JSON.parse(localStorage.getItem("favorites")!)).toContain("1");
});
