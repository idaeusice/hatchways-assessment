export const DOTS = "...";

function usePagination(pageDetails) {
  /*
    the pagination appear in such a way that the first and last page numbers
    would join into the list of pages without being separated by the ellipses if they were
    the next pages to be shown. 
  */
  if (pageDetails.currentPage > (Math.ceil(pageDetails.totalCount / pageDetails.pageSize) - 1)) {
    return [
      1, 
      DOTS,
      pageDetails.currentPage - 2, 
      pageDetails.currentPage - 1, 
      pageDetails.currentPage
    ];
  } else if (pageDetails.currentPage > (Math.ceil(pageDetails.totalCount / pageDetails.pageSize) - 2)) {
    return [
      1, 
      DOTS,
      pageDetails.currentPage - 1, 
      pageDetails.currentPage,
      pageDetails.currentPage + 1
    ];
  } else if (pageDetails.currentPage > 2){
    return [
      1,
      DOTS,
      pageDetails.currentPage - 1, 
      pageDetails.currentPage, 
      pageDetails.currentPage + 1,
      DOTS, 
      Math.ceil(pageDetails.totalCount / pageDetails.pageSize)
    ]
  } else {
    return [
      1, 2, 3, DOTS, Math.ceil(pageDetails.totalCount / pageDetails.pageSize)
    ]
  }
}

export default usePagination;
