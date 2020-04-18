import React from 'react';

const Country = ({name, handleDisplay}) => {
    return (
        <div>
           {name} <button onClick={handleDisplay}>show</button>
        </div>
     
    );
}
 
export default Country;