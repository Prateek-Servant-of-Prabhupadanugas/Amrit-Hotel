document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('whatsapp-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Base message
        let orderMessage = "Greetings Amrit Hotel, I would like to place a VIP order:\n\n";
        let hasItems = false;

        // Get all checked checkboxes
        const checkedItems = document.querySelectorAll('input[name="foodItem"]:checked');

        checkedItems.forEach(item => {
            hasItems = true;
            const itemName = item.value;
            
            // Reformat item name to match the ID of the quantity input (e.g., "Shahi Paneer" -> "qty-Shahi-Paneer")
            const idFormattedName = itemName.replace(/\s+/g, '-');
            const qtyElement = document.getElementById(`qty-${idFormattedName}`);
            
            let quantity = "1"; // Default fallback
            if (qtyElement) {
                quantity = qtyElement.value;
            }

            // Append to the WhatsApp message text
            orderMessage += `• ${itemName} - Qty/Size: ${quantity}\n`;
        });

        if (!hasItems) {
            alert("Please select at least one item from the royal menu to place an order.");
            return;
        }

        orderMessage += "\nThank you!";

        // Encode the string for a URL
        const encodedMessage = encodeURIComponent(orderMessage);
        
        // Hotel's WhatsApp Number
        const whatsappNumber = "919680346002"; 
        
        // Create the final link
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    });
});
