import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

function VideoDetails() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const a = new Date();
  const [dateFilter, setDate] = useState(
    {
      start:a.getFullYear()+'-'+a.getMonth()+1+'-'+'01',
      end:a.getFullYear()+'-'+a.getMonth()+1+'-'+a.getDate(),
    }
  );

  useEffect(() => {
    console.log("Heres")
    fetchData(currentPage);
  }, [currentPage, dateFilter]);

  const fetchData = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/video-data/?${searchTerm?'search='+searchTerm+'&':''}page=${page}`,
        );
        if (response) {
          setData(response.data.results);
          console.log("Here!!!", response.data.results, data)
      }
      setPageCount(Math.ceil(response.data.count / 5)); // Assuming your API provides total count

    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (data) => {
    console.log(data)
    const actualPage = Math.min(data.selected + 1, pageCount);
    setCurrentPage(actualPage); // Adjust for zero-based indexing
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1)
    fetchData(currentPage)
  }


  return (
    <div>

      <div className="container mt-4">
        <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="row">
              <div className="col-md-8 mb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            {data.map((item) => (
              <div key={item.id} className="row-md-6 mb-4">
                <a href={item.urls} className="text-decoration-none text-dark">
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img src={item.thumbnails.default.url} alt="Thumbnail" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h5 className="card-title">{item.video_title}</h5>
                          <p className="card-text">{item.description}</p>
                          <p className="card-text text-muted">{item.channel_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
      </div>






      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}

      />


    </div>
  );
}
export default VideoDetails;