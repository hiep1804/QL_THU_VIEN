import HeaderThuThu from '../layouts/HeaderThuThu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// API URLs
const BOOKS_API_URL = 'http://localhost:8080/thu-thu/sach';
const BOOKS_DATA_API_URL = 'http://localhost:8080/thu-thu/sach/data';
const BOOKS_EDIT_API_URL = 'http://localhost:8080/thu-thu/sach/sua';
const BOOKS_EDIT_SUBMIT_API_URL = 'http://localhost:8080/thu-thu/sach/sua/sach';
const BOOKS_DELETE_API_URL = 'http://localhost:8080/thu-thu/sach/xoa';

const ITEMS_PER_PAGE = 8;
const MAX_QUANTITY = 30;
const DEFAULT_BOOK_IMAGE = '/images/sachMD.jpg';

/**
 * Component thêm sách mới
 */
const AddBookForm = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatar, setAvatar] = useState(DEFAULT_BOOK_IMAGE);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const token = localStorage.getItem('token');

    /**
     * Xử lý khi người dùng chọn file ảnh
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Cập nhật đường dẫn avatar khi file thay đổi
     */
    useEffect(() => {
        if (selectedFile) {
            setAvatar(`/images/${selectedFile.name}`);
        }
    }, [selectedFile]);

    /**
     * Xử lý submit form thêm sách
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        const book = { name, quantity, category, author, avatar };
        formData.append('book', new Blob([JSON.stringify(book)], { type: 'application/json' }));

        try {
            const response = await axios.post(BOOKS_API_URL, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data);
            setName('');
            setQuantity(1);
            setCategory('');
            setAuthor('');
            setSelectedFile(null);
            setPreviewUrl(null);
            setAvatar(DEFAULT_BOOK_IMAGE);
        } catch (err) {
            console.error('Lỗi thêm sách:', err);
            setError(err.response?.data || err.message);
        }
    };

    return (
        <div className="tt_sach_r">
            <h2>Thêm sách</h2>
            <form onSubmit={handleSubmit}>
                {/* Hiển thị ảnh preview */}
                <img src={previewUrl || avatar} alt="Xem trước ảnh" />

                {/* Input chọn file ảnh */}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <br />

                {/* Input tên sách */}
                <label>
                    Tên sách:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />

                {/* Input số lượng */}
                <label>
                    Số lượng:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        max={MAX_QUANTITY}
                        required
                    />
                </label>
                <br />

                {/* Input danh mục */}
                <label>
                    Danh mục:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </label>
                <br />

                {/* Input tác giả */}
                <label>
                    Tác giả:
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </label>
                <br />

                <button type="submit">Thêm sách</button>
            </form>

            {/* Hiển thị lỗi nếu có */}
            {error && <p>{error}</p>}
        </div>
    );
};

/**
 * Component danh sách sách
 */
const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('token');
    const [totalPages, setTotalPages] = useState(0);
    const [allBooks, setAllBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    /**
     * Tải danh sách sách từ API
     */
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(BOOKS_DATA_API_URL, {
                    params: { tim: searchQuery },
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
                setAllBooks(response.data);

                if (Math.ceil(response.data.length / ITEMS_PER_PAGE) === 1) {
                    setBooks(response.data);
                } else if (Math.ceil(response.data.length / ITEMS_PER_PAGE) > 1) {
                    setBooks(response.data.slice(0, ITEMS_PER_PAGE));
                }
            } catch (error) {
                console.error('Lỗi tải danh sách sách:', error);
            }
        };

        fetchBooks();
    }, [searchQuery]);

    /**
     * Cập nhật danh sách sách khi trang thay đổi
     */
    useEffect(() => {
        setBooks(allBooks.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE));
    }, [currentPage]);

    /**
     * Xử lý trang trước
     */
    const handlePreviousPage = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage - 1);
    };

    /**
     * Xử lý trang sau
     */
    const handleNextPage = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    };

    /**
     * Xử lý chuyển trang
     */
    const handlePageChange = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    /**
     * Xử lý submit form tìm kiếm
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setCurrentPage(0);
    };

    const pageButtons = Array.from({ length: totalPages }, (_, i) => (
        <button
            key={i + 1}
            onClick={(e) => handlePageChange(e, i)}
            className="pagination-btn page-number-btn"
        >
            {i + 1}
        </button>
    ));

    return (
        <div className="tt_sach_l">
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
                {totalPages > 0 ? (
                    books.map((book) => (
                        <div className="sach" key={book.id}>
                            <Link to={`/sinh-vien/muon-sach/${book.id}`}>
                                <img src={book.avt} alt={book.name} />
                                <div className="sach_info">
                                    <p className="sach_name">{book.name}</p>
                                    <p>
                                        <strong>Danh mục:</strong> {book.danhMuc}
                                    </p>
                                    <p>
                                        <strong>Tác giả:</strong> {book.tacGia}
                                    </p>
                                    <p>
                                        <strong>Số lượng:</strong> {book.sl}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Không tìm thấy sách</p>
                )}
            </div>

            {/* Phân trang */}
            {totalPages > 0 && (
                <div className="pagination-container">
                    <button
                        className="pagination-btn prev-btn"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                    >
                        {'<<'}
                    </button>

                    <div className="page-numbers">{pageButtons}</div>

                    <button
                        className="pagination-btn next-btn"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        {'>>'}
                    </button>
                </div>
            )}
        </div>
    );
};

/**
 * Component sửa & xóa sách
 */
const EditDeleteBook = () => {
    const [searchInput, setSearchInput] = useState('');
    const token = localStorage.getItem('token');
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatar, setAvatar] = useState(DEFAULT_BOOK_IMAGE);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [bookId, setBookId] = useState(0);

    /**
     * Xử lý khi người dùng chọn file ảnh
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Cập nhật đường dẫn avatar khi file thay đổi
     */
    useEffect(() => {
        if (selectedFile) {
            setAvatar(`/images/${selectedFile.name}`);
        }
    }, [selectedFile]);

    /**
     * Xử lý submit form tìm kiếm sách
     */
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(BOOKS_EDIT_API_URL, {
                params: { timKiem: searchInput },
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (!response.data || response.data === '') {
                setError('Không tìm thấy sách này');
                setBook(null);
            } else {
                setBook(response.data);
                setBookId(response.data.id);
                setAvatar(response.data.avt);
                setName(response.data.name);
                setQuantity(response.data.sl);
                setCategory(response.data.danhMuc);
                setAuthor(response.data.tacGia);
                setError('');
            }
        } catch (err) {
            console.error('Lỗi tìm kiếm sách:', err);
            setError(err.response?.data?.error || 'Lỗi tìm kiếm sách');
        }
    };

    /**
     * Xử lý sửa hoặc xóa sách
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const actionType = e.nativeEvent.submitter.value;

        if (actionType === 'edit') {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const bookData = { id: bookId, name, quantity, category, author, avatar };
            formData.append('book', new Blob([JSON.stringify(bookData)], { type: 'application/json' }));

            try {
                const response = await axios.post(BOOKS_EDIT_SUBMIT_API_URL, formData, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(response.data);
                setBook(null);
                setError('');
            } catch (err) {
                console.error('Lỗi sửa sách:', err);
                setError(err.response?.data || 'Lỗi sửa sách');
            }
        } else if (actionType === 'delete') {
            const bookData = { id: bookId, name, quantity, category, author, avatar };

            try {
                const response = await axios.post(BOOKS_DELETE_API_URL, bookData, {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                alert(response.data);
                setBook(null);
                setError('');
            } catch (err) {
                console.error('Lỗi xóa sách:', err);
                setError(err.response?.data || 'Lỗi xóa sách');
            }
        }
    };

    return (
        <div className="tt_sach_sua">
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

            {/* Form sửa/xóa sách */}
            {book && book.name && (
                <form className="sua_xoa_sach_tt" onSubmit={handleSubmit}>
                    {/* Hiển thị ảnh preview */}
                    <img src={previewUrl || avatar} alt="Xem trước ảnh" />

                    {/* Input chọn file ảnh */}
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <br />

                    {/* Input tên sách */}
                    <label>
                        Tên sách:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    {/* Input số lượng */}
                    <label>
                        Số lượng:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            max={MAX_QUANTITY}
                            required
                        />
                    </label>
                    <br />

                    {/* Input danh mục */}
                    <label>
                        Danh mục:
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    {/* Input tác giả */}
                    <label>
                        Tác giả:
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </label>
                    <br />

                    {/* Buttons sửa/xóa */}
                    <button type="submit" value="edit">
                        Sửa sách
                    </button>
                    <button type="submit" value="delete">
                        Xóa sách
                    </button>
                </form>
            )}

            {/* Hiển thị lỗi nếu có */}
            {error && <p>{error}</p>}
        </div>
    );
};

/**
 * Component menu điều hướng
 */
const NavigationMenu = ({ onSelectOption }) => {
    return (
        <div className="menuSachTT">
            <p onClick={() => onSelectOption('1')}>Tìm kiếm</p>
            <p onClick={() => onSelectOption('2')}>Thêm</p>
            <p onClick={() => onSelectOption('3')}>Sửa & Xóa</p>
        </div>
    );
};

/**
 * Component trang quản lý sách thủ thư
 */
const ThuThuSach = () => {
    const [selectedOption, setSelectedOption] = useState('1');

    /**
     * Render component dựa trên option được chọn
     */
    const renderComponent = () => {
        switch (selectedOption) {
            case '1':
                return <BookList />;
            case '2':
                return <AddBookForm />;
            case '3':
                return <EditDeleteBook />;
            default:
                return <BookList />;
        }
    };

    return (
        <div>
            <HeaderThuThu />
            <NavigationMenu onSelectOption={setSelectedOption} />
            <div>{renderComponent()}</div>
        </div>
    );
};

export default ThuThuSach;