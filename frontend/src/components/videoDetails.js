import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams, useNavigate } from 'react-router-dom';
// import Header from './commanComponent/header';
function VideoDetails() {
  const [data, setData] = useState([]);
  const [pay, setPayData] = useState({ days_worked: 0, Total_payment: 0, absent_days: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('All');
  const [listOfUsers, setUsersList] = useState([]);
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
  }, [currentPage, dateFilter, currentUser]);

  const fetchData = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/video-data/?page=${page}`,
        // ?${id ? 'employee_id=' + id + '&' : ''}${dateFilter.start && dateFilter.end ? 'attendance_start_date=' + dateFilter.start + '&attendance_end_date=' + dateFilter.end+'&' : ''}page=${page}
        );
        if (response) {
          setData(response.data.results);
          console.log("Here!!!", response.data.results, data)
      }
      setPageCount(Math.ceil(response.data.count / 5)); // Assuming your API provides total count

    } catch (error) {
      console.log(">>>>>>", pay)
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


  return (
    <div>

      <div className="container mt-4">
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="row-md-6 mb-4">
              <a href={item.urls} className="text-decoration-none text-dark">
                <div className="card">
                  <div className="row g-0">
                    {/* Uncomment the line below if thumbnails are available */}
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