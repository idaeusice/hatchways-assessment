import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";
import { useState, useEffect } from "react"; 

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [currentPaginationData, setCurrentPaginationData ] = useState(blogs.posts.slice(0, 15));
  const [rowsPerPage, setRowsPerPage ] = useState(PAGE_SIZES[1]); //show 25 rows default
  const [currentPage, setCurrentPage ] = useState(1); //page 1 default

  //useEffect hook waits on changes to the number of rows shown per page.
  //on update to the state, updatePage is called and tries to re-render the current page. 
  //if the page is no longer within the constraints of the total number of pages, returns
  //the user to the last available page. 
  useEffect(() => {
    if(currentPage > Math.ceil(blogs.posts.length / rowsPerPage))
      updatePage(Math.ceil(blogs.posts.length / rowsPerPage));
    else 
      updatePage(currentPage);
  }, [rowsPerPage]);

  const updateRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const updatePage = (page) => {
    //set state for the current page.
    setCurrentPage(page);
    //gets the indexes of blog posts based on the page number multiplied by the number of rows per page.
    //this should correctly get the data in a way that depends on what the page size is and which page is
    //currently selected by the user. 
    setCurrentPaginationData(blogs.posts.slice((page - 1) * rowsPerPage, page * rowsPerPage));

  };

  
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={parseInt(rowsPerPage)}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {
          currentPaginationData.map((blog) => (
            <BlogPost
              key={blog.id}
              author={blog.author}
              title={blog.title}
              excerpt={blog.excerpt}
              featureImage={blog.image}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default BlogList;
