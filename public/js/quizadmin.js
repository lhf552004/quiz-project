$(function() {
    $('.create-quiz-btn').on('click', function() {
        if($('input#quizname').val().length > 0) {
            const quizName = $('input#quizname').val();
            $.ajax({
                url: '/quiz/',
                type: 'POST',
                data: {
                    name: quizName
                },
                success: function(data) {
                    console.log(data);
                }
            });
        }
    });
});