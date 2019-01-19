module.exports = {

     paginate:  function(data, page = 1, resperPage = 10, numResults) {
        let start = (page - 1) * 10,
          end = page * 10;
          data.recipes.slice(start, end).forEach(recipe);
       const pages = Math.ceil(numResults/resperPage);
       if(page === 1 && pages > page ) {
           // link for the next page
       } else if (page > 1 && page < pages) {
           //link for the next page and prev
       } else if (pages > 1 && pages === page) {
           //link for the prev
       }
    
      }

}
