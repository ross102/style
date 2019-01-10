
// Toggle edit review form
$('.toggle-edit-form').on('click', function() {
	// toggle the edit button text on click
	$(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
	// toggle visibility of the edit review form
	$(this).siblings('.edit-review-form').toggle();
});

// Add Click listener for deleting rating
$('.clear-rating').click(function() {
   $(this).siblings('.input-no-rate').click();
})
