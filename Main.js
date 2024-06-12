$(document).ready(() => {
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        const ip = data.ip;
        $("#gfg").html(ip);

        $.getJSON(`https://ipapi.co/${ip}/json/`, function (locationData) {
            const latitude = locationData.latitude;
            const longitude = locationData.longitude;

            const map = L.map('mapid').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            L.marker([latitude, longitude]).addTo(map)
                .bindPopup(`<b>Location based on IP:</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}`)
                .openPopup();
        }).fail(function () {
            $("#gfg").html("Failed to retrieve location details");
        });
    }).fail(function () {
        $("#gfg").html("Failed to retrieve IP address");
    });
});
