import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";

const product = {
    id: "1",
    title: "Producto modal",
    price: 50,
    rating: 5,
    stock: 20,
    thumbnail: "/test.jpg",
    description: "desc",
};

test("cierra el modal con Escape", () => {
    render(<ProductCard product={product} />);

    // Abrir modal
    const openBtn = screen.getByRole("button", { name: "" }); // el botón de abrir modal
    fireEvent.click(openBtn);

    // Ver modal abierto
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Presionar Escape
    fireEvent.keyDown(document, { key: "Escape" });

    // Modal cerrado
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
