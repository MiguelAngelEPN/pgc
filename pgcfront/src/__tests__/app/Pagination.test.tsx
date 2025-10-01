import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../components/Pagination";

describe("Pagination", () => {
    it("muestra el indicador de página y navega con prev/next", () => {
        const setPage = jest.fn();
        render(<Pagination currentPage={1} totalPages={3} setCurrentPage={setPage} />);

        // El indicador "Página 1 / 3" existe
        expect(screen.getByText(/Página\s*1\s*\/\s*3/i)).toBeInTheDocument();

        // Botón anterior está deshabilitado porque estamos en la página 1
        const prevBtn = screen.getByRole("button", { name: "<" });
        expect(prevBtn).toBeDisabled();

        // Botón siguiente está habilitado y al hacer click llama setCurrentPage(2)
        const nextBtn = screen.getByRole("button", { name: ">" });
        expect(nextBtn).not.toBeDisabled();

        fireEvent.click(nextBtn);
        expect(setPage).toHaveBeenCalledWith(2);
    });

    it("permite navegar hacia atrás cuando currentPage > 1", () => {
        const setPage = jest.fn();
        render(<Pagination currentPage={2} totalPages={3} setCurrentPage={setPage} />);

        const prevBtn = screen.getByRole("button", { name: "<" });
        expect(prevBtn).not.toBeDisabled();

        fireEvent.click(prevBtn);
        expect(setPage).toHaveBeenCalledWith(1);
    });
});
