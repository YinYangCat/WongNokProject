// rating.js
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating-value");

let selectedRating = 0;

stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
        highlightStars(index + 1);
    });

    star.addEventListener("mouseout", () => {
        highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
        selectedRating = selectedRating === index + 1 ? 0 : index + 1;
        ratingInput.value = selectedRating;
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    stars.forEach((star, i) => {
        star.classList.toggle("text-yellow-400", i < rating);
        star.classList.toggle("text-gray-300", i >= rating);
    });
}