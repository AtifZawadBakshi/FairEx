
const  Pagination= ({links,onChangePaginate})=>{
    console.log(links)
    let getPaginateLink = (url)=>{
        onChangePaginate(url);
    }
     return (
         <div>
             <ul className="pagination">
                { links &&    
                links.map((el,i)=>{
                    let url = el.url ? el.url : "";
                    let is_link = true;
                    if (url.length <=1) {
                        is_link = false;
                    } 
                    let label = el.label;
                    if( label === 'Next &raquo;' ){
                    label = 'Next';
                    } else if( label === '&laquo; Previous' ) {
                    label = 'Previous';
                    }

                    return (
                        <li key={i} className={el.active ? 'active paginate_button page-item previous' : 'paginate_button page-item previous'}  >
                            
                            {is_link && (
                            <a 
                            className="page-link"
                            onClick={getPaginateLink.bind(this , el.url)}
                            >{label}</a>
                            )}
                            {!is_link && (
                            
                            <span className="page-link disabled">{label}</span>
                        )}
                    </li>

                );
            
                })}
                
            </ul>
         </div>
     )
}

export default Pagination;