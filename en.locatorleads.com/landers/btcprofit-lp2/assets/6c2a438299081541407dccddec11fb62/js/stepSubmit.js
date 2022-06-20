$(document).ready(function(){
    //Step Form
    let curStepIndex = 1;

    $('.registerForm,.register-form-body').on('beforeSubmit', function (e) {
        e.preventDefault();
        $('.required').removeClass('has-success');
        curStepIndex ++;
        let loginForm = $(this);
        let curField = $('.list-step-js').find("[data-index='"+ curStepIndex +"']");
        let curStep = $('.step-js').find("[data-step='"+ curStepIndex +"']");
        let thisStepUrl = loginForm.attr('action') + '/' + (curStepIndex - 1);

        //Scroll to form
        if($(this).data('scroll')) {
            let thisAnchorStep = loginForm.offset().top;
            let thisOffset =  loginForm.data('offset');
            $('body,html').animate({scrollTop: thisAnchorStep - thisOffset}, 500);
        };

        if(curStepIndex <= 3) {
            $('.list-step-js .slide').addClass('d-none');
            $('.step-js li').removeClass('active');
            curField.removeClass('d-none');
            curStep.addClass('active');
        }

        switch (curStepIndex - 1){
            case 1:
                $.LoadingOverlay("show");
                $.ajax({
                    type: loginForm.attr('method'),
                    url: thisStepUrl,
                    data: loginForm.serializeArray(),
                    complete: function (e) {
                        $.LoadingOverlay("hide");
                    }
                });
                curField.find('fieldset').attr('disabled', false);
                $(".FirstName").val($(this).find(".FirstName").val());
                $(".LastName").val($(this).find(".LastName").val());
                return false;
                break;
            case 2:
                curField.find('fieldset').attr('disabled', false);
                return false;
                break;
            case 3:
                $.LoadingOverlay("show");
                let inputs = loginForm.find(':disabled');
                inputs.prop('disabled', false);
                break;
            default:
                return false;
        };
    });
});