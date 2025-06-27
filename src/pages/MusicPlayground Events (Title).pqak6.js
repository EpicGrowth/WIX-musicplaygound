// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {
    console.log("Page is ready");

    $w("#dataset1").onReady(() => {
        console.log("dataset1 is ready");

        const dataset1Count = $w("#dataset1").getTotalCount();
        console.log("Dataset1 item count:", dataset1Count);

        // Section 34
        if (dataset1Count === 0) {
            $w("#section34").collapse();
        } else {
            $w("#section34").expand();
        }

        // Section 39
        const datasetMusiciansCount = dataset1Count;
        console.log("Dataset-musicians item count:", datasetMusiciansCount);

        if (datasetMusiciansCount === 0) {
            $w("#section39").collapse();
        } else {
            $w("#section39").expand();
        }

        // ✅ Call function to start Repeater rotation **inside onReady**
        startRepeaterRotation();
        
    });
});

// ✅ Function to rotate repeater items automatically
function startRepeaterRotation() {
    let repeater = $w("#repeater1"); // Target repeater
    let dataset = $w("#dataset1"); // Target dataset
    let data = [];

    dataset.getItems(0, 100) // Fetch all items from the dataset
        .then(result => {
            data = result.items; // Store dataset items in an array
            console.log("Fetched dataset items:", data);

            if (data.length > 1) {
                setInterval(() => {
                    let firstItem = data.shift(); // Move the first item to the end
                    data.push(firstItem);
                    repeater.data = data; // Update the repeater
                    console.log("Updated repeater data:", data);
                }, 3000); // Change every 3 seconds
            }
        })
        .catch(err => console.error("Error loading dataset:", err));

}


// ✅ Function to show/hide #buttonRegister based on `jamregi` Boolean field
function updateButtonVisibility() {
    let dataset = $w("#dataset1"); // Target dataset

    dataset.getItems(0, 1) // Fetch the first item from dataset1
        .then(result => {
            if (result.items.length > 0) {
                let jamregiValue = result.items[0].jamregi; // Get boolean value
                console.log("jamregi value:", jamregiValue);

                if (jamregiValue) {
                    $w("#buttonRegister").expand(); // Show button if true
                } else {
                    $w("#buttonRegister").collapse(); // Hide button if false
                }
            } else {
                $w("#buttonRegister").collapse(); // Hide if no data found
            }
        })
        .catch(err => console.error("Error checking jamregi:", err));
}