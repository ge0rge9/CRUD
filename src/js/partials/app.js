$(document).ready(function () {

    window.addEventListener('load', function () {
        document.querySelector('#cars-btn').addEventListener('click', function () {
            toggleBlock('#cars');
            hideBlock('#owners');
            generateCarsBlock();
        });
        document.querySelector('#owners-btn').addEventListener('click', function () {
            toggleBlock('#owners');
            hideBlock('#cars');
            generateOwnersBlock();
        });
    });

});


