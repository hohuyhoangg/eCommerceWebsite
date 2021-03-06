const FORM_ID = 'getbill';

let id = document.getElementById('id');//bill_id
let lastName = document.getElementById('last-name');//delivery_id

let isValidate = true;


$('#' + FORM_ID).submit(function (e) {
  e.preventDefault();

  let paras = JSON.stringify({
    'id': id.value.toString(),//bill_id
    'last-name': lastName.value.trim()//delivery_id
  });

  if (isValidate) {
    $.ajax({
      url: '/api/seller',
      method: 'PUT',
      async: false,
      cache: false,
      data: paras,
      success: function (data, textStatus, jqXHR) {
        let result = data.toString().split('\n');
        if (result[0] === 'true') {
          $('#successful-modal').modal('show');
          $('#successful-modal').on('hidden.bs.modal', function () {
            window.location.href = window.location.origin +  '/admin/seller';
          });
          //window.location.href = window.location.origin +  '/admin/employee';
        } else {
          alert("Lỗi: " + result[1]);
          e.preventDefault();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("Lỗi javascript: " + errorThrown);
        e.preventDefault();
      }
    });
  }
});

$('#btn-cancel').click(function () {
  $('#' + FORM_ID).trigger("reset");
});