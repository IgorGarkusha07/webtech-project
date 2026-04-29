// get the buttonby its ID and add "click" event
document.getElementById('loadSpecsBtn').addEventListener('click', function(){
    fetch('data.json')  // send a request for data from data.json
        .then(function (response) { // .then handles the raw response from the server
        return response.json(); // convert response to json format
    })
        .then(function (data) {   // handles parsed json data

            // gete reference to table body where rows will be inserted
            const tbody = document.getElementById('tableBody');
            tbody.innerHTML = ''; // clear table before importing new data
            const inventory = data.inventory;  // get in "inventory" from json
            for(let category in inventory){  // create loop through categories
                let brands = inventory[category]; // get brands from each category
                for(let brand in brands){ // loop through brands
                    brands[brand].forEach(function(item){ //loop though items

                        // create table for items
                        const row = `<tr>  
                        <td>${category}</td>
                        <td>${brand}</td>
                        <td>${item.model}</td>
                        <td>${item.price}</td>
                        <td>${item.specs}</td>
                        </tr>`;
                        // append row to table body
                        tbody.innerHTML += row;
                    });
                }
            }
            // make the table visible after loading
            document.getElementById('tableContainer').style.display = 'block';
        })
        //catch errors
        .catch(function (error) {
            console.error('Error JSON loading', error);
        });
})