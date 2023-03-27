$(function() {
    $('.quiz-answer').on('click', function() { // on quiz answer clicked
        $(this).siblings('.quiz-answer').removeClass('active'); // remove active class from all siblings answers

        $(this).addClass('active'); // add active class to click target

        $('.next-button').attr('disabled', false); // able next button
    });

    $('.next-button').on('click', function() {
        let current_right_answer = '';
        let current_answer = $('.quiz-item.active .quiz-answer.active').text().toString().trim().toLowerCase();

        $.ajax({
            url: '/quizitem/' + $('.quiz-item.active').data('id') + '/quiz/' + $('.quiz-container').data('quiz-name'),
            type: 'GET',
            success: function(data) {
                current_right_answer = data.answer;

                if(current_answer == current_right_answer.toString().trim().toLowerCase()) { // if the current answer is right
                    $('.quiz-item.active .quiz-answer.active').addClass('right'); // visually show right answer
    
                    $('.quiz-container').data('right-answer', parseInt($('.quiz-container').data('right-answer')) + 1); // increment the number of right answers
                }
                else { // is wrong
                    $('.quiz-item.active .quiz-answer.active').addClass('wrong'); // visually show the wrong answer
    
                    $('.quiz-item.active .quiz-answer[data-ans-value=' + current_right_answer + ']').addClass('right'); // show the right answer
                }
    
                setTimeout(function() { // Give user 2 seconds to view the question result
                    let nextQuestion = $('.quiz-item.active').next('.quiz-item');
    
                    $('.quiz-item.active').removeClass('active'); // hide current quiz item
    
                    $('.next-button').attr('disabled', true); // disable next button
    
                    if(nextQuestion.length) { // still have more question
                        nextQuestion.addClass('active');
                    }
                    else { // else show result
                        $('.finish-quiz .right-answer').text($('.quiz-container').data('right-answer'));
    
                        $('.finish-quiz').css('display', 'block');
    
                        $('.button-container').remove();
                    }
    
                }, 2000);
            }
        });
    });
});