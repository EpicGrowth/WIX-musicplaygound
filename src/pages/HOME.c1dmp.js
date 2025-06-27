import wixUsers from 'wix-users';
import wixPaidPlans from 'wix-paid-plans';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    try {
        console.log("Checking user login status...");
        if (wixUsers.currentUser.loggedIn) {
            console.log("User is logged in");
            const userEmail = await wixUsers.currentUser.getEmail();
            console.log("User email:", userEmail);
            
            const shouldPay = await needsToPay();
            console.log("Should user pay?", shouldPay);
            
            if (shouldPay) {
                console.log("Redirecting to pricing page...");
                wixLocation.to("https://www.musicplayground.org/plans-pricing");
            }
        } else {
            console.log("User is not logged in");
        }
    } catch (error) {
        console.error("Error in payment check flow:", error);
    }
});

async function needsToPay() {
    try {
        const orders = await wixPaidPlans.getCurrentMemberOrders();
        // Check if the user has any active plan
        const activeOrder = orders.some(order => order.status === "ACTIVE");
        return !activeOrder; // If no active plans, they need to pay
    } catch (error) {
        console.error("Error checking payment status:", error);
        return true; // Assume they need to pay if there's an error
    }
}
