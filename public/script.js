document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intake-form");
    const entriesList = document.getElementById("entries-list");
    const totalProteinDisplay = document.getElementById("total-protein");
    const totalCarbsDisplay = document.getElementById("total-carbs");
    const foodImage = document.getElementById("food-image");
    const foodSelect = document.getElementById("food");

    let totalProtein = 0;
    let totalCarbs = 0;

    const foodData = {
        chicken: { protein: 27, carbs: 0, img: "/images/chicken.jpg" },
        egg: { protein: 13, carbs: 1.1, img: "/images/egg.jpg" },
        milk: { protein: 3.4, carbs: 5, img: "/images/milk.jpg" },
        paneer: { protein: 18, carbs: 2, img: "/images/paneer.jpg" },
        rice: { protein: 2.7, carbs: 28, img: "/images/rice.jpg" },
        banana: { protein: 1.3, carbs: 23, img: "/images/banana.jpg" }
    };

    // Update food image when selection changes
    foodSelect.addEventListener("change", () => {
        const selectedFood = foodSelect.value;
        foodImage.src = foodData[selectedFood].img;
    });

    async function fetchEntries() {
        const response = await fetch("http://localhost:5000/entries");
        const data = await response.json();
        entriesList.innerHTML = "";
        totalProtein = 0;
        totalCarbs = 0;

        data.forEach(entry => {
            totalProtein += entry.protein;
            totalCarbs += entry.carbs;

            const li = document.createElement("li");
            li.className = "flex justify-between items-center bg-white p-3 rounded-lg shadow-md";
            li.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${foodData[entry.food].img}" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <p class="font-semibold">${entry.food} - ${entry.quantity}g</p>
                        <p class="text-sm text-gray-500">${entry.protein}g Protein | ${entry.carbs}g Carbs</p>
                    </div>
                </div>
                <button onclick="deleteEntry('${entry._id}')" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    ❌
                </button>
            `;
            entriesList.appendChild(li);
        });

        totalProteinDisplay.innerText = totalProtein;
        totalCarbsDisplay.innerText = totalCarbs;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const food = foodSelect.value;
        const quantity = parseFloat(document.getElementById("quantity").value);

        const proteinIntake = (quantity / 100) * foodData[food].protein;
        const carbIntake = (quantity / 100) * foodData[food].carbs;

        await fetch("http://localhost:5000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: new Date().toISOString().split("T")[0],
                food,
                quantity,
                protein: proteinIntake,
                carbs: carbIntake
            })
        });

        form.reset();
        fetchEntries();
    });

    window.deleteEntry = async (id) => {
        await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" });
        fetchEntries();
    };

    fetchEntries();
});
