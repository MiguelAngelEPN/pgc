import React from 'react'

export const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded bg-[var(--gravastar-magenta)] hover:bg-[var(--gravastar-purple)] disabled:opacity-40"
            >
                &lt;
            </button>

            <span>
                Página {currentPage} / {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded bg-[var(--gravastar-magenta)] hover:bg-[var(--gravastar-purple)] disabled:opacity-40"
            >
                &gt;
            </button>
        </div>
    )
}
