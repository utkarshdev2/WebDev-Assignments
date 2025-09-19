fetch("airbnb_sf_listings_500.json")
    .then(response => response.json())
    .then(data => {
        const listingsContainer = document.getElementById("listings");

        const allListings = data.slice(0, 50);

        allListings.forEach(listing => {

            const card = document.createElement("div");
            card.className = "listing-card";

            let amenitiesArray;
            try {
                amenitiesArray = JSON.parse(listing.amenities);
            } catch (e) {
                amenitiesArray = [];
            }
            
            const amenitiesText = amenitiesArray.length > 0 ? amenitiesArray.join(", ") : 'N/A';

            card.innerHTML = `
            <h2>${listing.name}</h2>
            <img src="${listing.picture_url || ''}" alt="${listing.name || 'Listing image'}" class="thumbnail">
            <p>${listing.description}</p>
            <p><strong>Amenities:</strong> ${amenitiesText}</p>
            <div class="host">
                <img src="${listing.host_picture_url}" alt="${listing.host_name}" class="host-photo">
                <span>${listing.host_name}</span>
            </div>
            <p class="price">${listing.price} / night</p>
            `;

            listingsContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading listings:", error))

