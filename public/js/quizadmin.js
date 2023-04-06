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
                success: function() {
                    window.location.href = '/quizitem/quiz/' + quizName + '/add-quiz-item'
                }
            });
        }
    });

    $('.answer-checkbox').on('click', (e) => {
        const selected = $(e.target).attr('id');

        $('.answer-checkbox:not(#' + selected + ')').prop('checked', false);
    });
    
    const createQuizItem = function() {
        const quizName = $('.add-item-container').data('name');
        const question = $('.add-item-container input#question').val();
        const optionFields = $('.option-field');
        let optionArr = [];
        let answer = '';

        optionFields.each(function(index, elem) {
            let option = $(elem).find('.option-text').val();

            if(option.length > 0) {
                optionArr.push(option);

                if($(elem).find('.answer-checkbox').is(':checked')) {
                    answer = option;
                }
            }
        });

        let dataObj = {
            'id': 1,
            'question': "What's the most popular fast food chain?",
            'options': ["KFC", "McDonald's", "Wendy's", "Mary Brown's"],
            'answer': "McDonald's"
        };

        $.ajax({
            url: '/quizitem/' + quizName,
            type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
            success: function(data){
                console.log(data);
            }
        });
    }

    $('.create-quiz-item-btn').on('click', createQuizItem);
});