$(function() {
    $('.quiz-answer').on('click', function() {
        $(this).siblings('.quiz-answer').removeClass('active');

        $(this).addClass('active');

        $('.next-button').attr('disabled', false);
    });

    $('.next-button').on('click', function() {
        let current_right_answer = $('.quiz-item.active .quiz-item-question').data('answer');
        let current_answer = $('.quiz-item.active .quiz-answer.active').data('answer-id');

        if(current_answer == current_right_answer) {
            $('.quiz-item.active .quiz-answer.active').addClass('right');

            $('.quiz-container').data('right-answer', parseInt($('.quiz-container').data('right-answer')) + 1);
        }
        else {
            $('.quiz-item.active .quiz-answer.active').addClass('wrong');

            $('.quiz-item.active .quiz-answer[data-answer-id=' + current_right_answer + ']').addClass('right');
        }

        setTimeout(function() {
            let nextQuestion = $('.quiz-item.active').next('.quiz-item');

            $('.quiz-item.active').removeClass('active');

            console.log(nextQuestion);

            if(nextQuestion.length) {
                nextQuestion.addClass('active');
            }
            else {
                $('.finish-quiz .right-answer').text($('.quiz-container').data('right-answer'));

                $('.finish-quiz').css('display', 'block');

                $('.button-container').remove();
            }

        }, 2000);
    });
});
