import React from 'react';

const Filter = ({handlFilter, search}) => {
    return (
        <div>
          filter shown with: <input onChange={handlFilter} value={search} />
        </div>
     );
}
 
export default Filter;