
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('clevertap_sw.js').then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function (error) {
        console.log('Service Worker registration failed:', error);
    });
}
clevertap.event.push("Web Session Started");

//Push Notification Permission
document.getElementById('enableNotificationsButton').addEventListener('click', function() {
    clevertap.notifications.push({
        "titleText": "Would you like to receive notifications?",
        "bodyText": "We promise to only send you relevant content and give you updates on our new products.",
        "okButtonText": "Yes",
        "rejectButtonText": "No",
        "okButtonColor": "#f28046"
    });
});

//onUserLogin
document.getElementById('loginButton').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var membership = document.getElementById('membership').value;

    clevertap.onUserLogin.push({
        "Site": {
            "Name": name,
            "Identity": phone,
            "Email": email
        }
    });

    clevertap.profile.push({
        "Site": {
            "Customer Type": membership
        }
    });

    alert('User Logged In and Profile Updated');
});

//Product Viewed Event
document.getElementById('viewProductButton').addEventListener('click', function() {
    clevertap.event.push("Product Viewed", {
        "Product Name": "Sample Product",
        "Category": "Sample Category",
        "Price": 99.99,
        "Currency": "USD"
    });
    alert('Product Viewed Event Sent');
});

//Native Display(Remaining!!)
clevertap.notifications.push({
    "title": "Native Display Title",
    "message": "This is a native display message",
    "type": "native",
    "content": {
        "html": "<p>Native Display Content goes here</p>",
        "targets": [
            {
                "id": "clevertap-native-display",
                "options": {
                    "display": "inline",
                    "css": {
                        "background": "#fff",
                        "padding": "10px",
                        "border": "1px solid #ccc",
                        "border-radius": "4px"
                    }
                }
            }
        ]
    }
});


document.getElementById('addToCartButton').addEventListener('click', function() {
    clevertap.event.push("Add to Cart", {
        "Product Name": "Sample Product",
        "Category": "Sample Category",
        "Price": 99.99,
        "Currency": "USD"
    });
    alert('Add to Cart Event Sent');
});

// Exit Intent detection
let exitIntentTimeout;

document.addEventListener('mouseleave', function(event) {
    if (event.clientY < 0) {
        exitIntentTimeout = setTimeout(function() {
            clevertap.event.push("Exit Intent Detected", {
                "Page": window.location.pathname
            });
            alert('Exit Intent Detected');
        }, 60000);//milisecs
    }
});
document.addEventListener('mouseenter', function() {
    clearTimeout(exitIntentTimeout);
});

function openLuckyDraw() {
    window.location.href = "https://gleam.io/MdGAK/carry1st-shop-lucky-draw";
}

document.getElementById("fireBookingEvent").addEventListener("click", () => {
  // Generate current time in epoch format
  const currentEpoch = Math.floor(Date.now() / 1000);

  // Fire the CleverTap event
  clevertap.event.push("booking_created", {
    orderNumber: "ORD12345", // Example order number
    type: "SERVICE",         // Example type
    name: "Service Booking", // Example service name
    serviceType: "On-Site",  // Example service type
    dateTime: `$D_${currentEpoch}` // Pass the current time in epoch format
  });

  console.log("Booking Created Event Fired with current time:", `$D_${currentEpoch}`);
});

