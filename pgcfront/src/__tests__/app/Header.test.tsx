import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";
import { Header } from "../../components/Header";

const product = {
    id: "1",
    title: "Producto carrito",
    price: 99,
    rating: 4,
    stock: 5,
    thumbnail: "/test.jpg",
    description: "desc",
};

beforeEach(() => {
    localStorage.clear();
});

test("actualiza contador del carrito en Header", () => {
    render(<Header />);
    render(<ProductCard product={product} />);

    const addBtn = screen.getByText("Agregar al carrito");
    fireEvent.click(addBtn);

    expect(screen.getByText("1")).toBeInTheDocument();
});
