import HeaderSinhVien from '../layouts/HeaderSinhVien';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Component danh sách sách để mượn
 */
export default function SinhVienMuonSach() {
    const [books, setBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // URL API
    const BOOKS_API_URL = 'http://localhost:8080/sinh-vien/sach';

    // Tải danh sách sách từ API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(BOOKS_API_URL, {
                    params: { tim: searchQuery },
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Lỗi tải danh sách sách:', error);
            }
        };

        fetchBooks();
    }, [searchQuery]);

    /**
     * Xử lý submit form tìm kiếm
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    /**
     * Xử lý click vào sách để xem chi tiết
     */
    const handleBookClick = (bookId) => {
        navigate(`/sinh-vien/muon-sach/${bookId}`);
    };

    return (
        <div>
            <HeaderSinhVien />
            <div className="tt_sach_l" style={{width:"100%"}}>
                {/* Form tìm kiếm */}
                <form className="tim_kiem" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        placeholder="Tìm kiếm sách"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit">
                        <img src="/images/tim_kiem.png" alt="tìm kiếm" />
                    </button>
                </form>

                {/* Danh sách sách */}
                <div>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div
                                className="sach"
                                key={book.id}
                                onClick={() => handleBookClick(book.id)}
                            >
                                <img src={book.avt} alt={book.name} />
                                <div className="sach_info">
                                    <p className="sach_name">{book.name}</p>
                                    <p>
                                        <strong>Danh mục:</strong> {book.danhMuc}
                                    </p>
                                    <p>
                                        <strong>Tác giả:</strong> {book.tacGia}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">Không tìm thấy sách</p>
                    )}
                </div>
            </div>
        </div>
    );
}